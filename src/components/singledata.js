import React from "react"




const SingleData = ({report})=>{

  let current = report.list[0],
  date = new Date(current.dt_txt)
      return(

          <div id="singledata" className="report-cards">
              <div id="toplayer">
                {report.flag ?   <div className="country-image">
                      <div style={{backgroundImage:`url(${report.flag})`}}></div>
                  </div> : null}
                  <div className="country-weather-details">
                      <p>{current.main.temp}<br/> <span>F</span></p>
                      <p>{current.weather[0].description}</p>
                  </div>
              </div>
              <div  id="bottomlayer">
                  <div><b>{report.city.country}</b></div>
                  <div>
                    <p>{report.city.name}</p>
                    <p>{"Population :" + report.city.population}</p>
                  </div>
                  <div>
                      <p>{date.toDateString()}</p>
                      <p>{date.toLocaleTimeString()}</p>
                  </div>
              </div>
          </div>
      )
}


export default SingleData
