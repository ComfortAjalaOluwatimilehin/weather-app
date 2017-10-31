import React, {Component} from "react"
import Map from "./map"
import InfoBox from "./infobox.js"
import SETTINGS from "../settings.json"


class Canvas extends Component{
      constructor(props){
          super(props)
          this.state = {
          center:{  lat: -34.397, lng:150.644},
          selectedWeatherReport:null
          }

      }
      closeInfoBox(){
          return this.setState({selectedWeatherReport:null})
      }
      componentDidMount(){

        //get the user's location
        if ("geolocation" in navigator) {
                  /* geolocation is available */
                  navigator.geolocation.getCurrentPosition((position) => {
                        let lat = position.coords.latitude, lng = position.coords.longitude
                        this.setState({center:{lat, lng}});
                  });
        }

        }

        handleMapClick(props){
           //return this.getWeatherReportFromJsonFile()
            let lat = (props.latLng.lat()), lng = props.latLng.lng()
            return this.getWeatherReport(lat, lng)
        }
        getWeatherReport(lat, lng){
              var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${SETTINGS.openweatherid}&units=imperial`
              let that = this
              fetch(requestUrl)
              .then(response=>response.json())
        .then(json=>{
                //store once
                //localStorage.setItem("weatherreport",  JSON.stringify(json))
                that.setState({selectedWeatherReport:json})
                return fetch(`https://restcountries.eu/rest/v2/alpha/${json.city.country}`)
              })
              .then(response=>response.json())
              .then(flagjson=>{
                  let newstate = Object.assign({}, that.state.selectedWeatherReport, {flag:flagjson.flag})
                  this.setState({selectedWeatherReport:newstate})
                //  localStorage.setItem("weatherreport",  JSON.stringify(newstate))
              })
              .catch(error=>console.error(error))
        }
        getWeatherReportFromJsonFile(){
          var weatherreport = localStorage.getItem("weatherreport")
              weatherreport = JSON.parse(weatherreport)
              this.setState({selectedWeatherReport:weatherreport})
        }
        render(){


              return(

                        <div id="canvas">
                            <Map
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDoaSE6zHK2WKiOKd3a0TiFAY2xRbHjelo"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                center={this.state.center}
                                handleMapClick={this.handleMapClick.bind(this)}
                            />

                            <InfoBox
                            report={this.state.selectedWeatherReport}
                            toggle={this.state.selectedWeatherReport ? true : false}
                            closeInfoBox={this.closeInfoBox.bind(this)}
                            />

                        </div>

              )
        }
}

  //<InfoBox title="Edinburg"/>
export default Canvas;
