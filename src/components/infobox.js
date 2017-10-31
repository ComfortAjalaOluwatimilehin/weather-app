import React, {Component} from "react"
import {Transition} from "react-transition-group"
import SingleData from "./singledata"
import GraphRep from "./graphrep"
const transitionStyles = {
  entering: { opacity: 0, transform:"translateY(300px)" },
  entered:  { opacity: 1, transform:"translateY(0px)" },
};





class InfoBox extends Component{

        constructor(props){
            super(props)
            this.handleReport = this.handleReport.bind(this)
            this.switchBox =this.switchBox.bind(this)
            this.state = {
              currentview:"singledata"
            }
        }
        handleReport(report){
              //filters report
              let insert = []
              report = report.filter((day,i)=>{
                  let d = (new Date(day.dt_txt)).getDate()
                  if(!insert.includes(d)){  insert.push(d); return day }
                  return false;
              })
              let weekdays = ["sun","mon","tues", "wed", "thurs", "fri", "sat"]
              let xdata = (report.map((day)=>day.dt_txt)).slice(0, 50)
              let ydata = (report.map((day)=>day.main.temp)).slice(0, 50)
              let data = xdata.map((day,i)=>  {
                let d = new Date(day)
                return {"temperature":ydata[i], "date":d.getDate() + "-" + (weekdays[d.getDay()])}
              } )
            return data

        }
        switchBox(str){
          this.setState({currentview:str})
        }
        render(){

              return (
                  <Transition in={this.props.toggle} timeout={300}>
                      {(state)=>(
                        <div id="infobox" style={{...transitionStyles[state]}}>
                              <div id="graphrepbutton" className="infoboxbuttons" onClick={()=>this.switchBox("graph")}><i className="material-icons">timeline</i></div>
                              <div id="sharetwitterbutton" className="infoboxbuttons" onClick={()=>this.switchBox("share")}><i className="material-icons">favorite</i></div>
                              <div id="singledatabutton" className="infoboxbuttons" onClick={()=>this.switchBox("singledata")}><i className="material-icons">label</i></div>
                              <div id="closeinfo" className="infoboxbuttons"><i className="material-icons" onClick={this.props.closeInfoBox}>close</i></div>
                                    {this.state.currentview === "singledata"  && this.props.report ?
                                      <SingleData report={this.props.report}/>
                                      :null
                                    }
                                    {this.state.currentview === "graph"  && this.props.report ?
                                    <GraphRep data={this.handleReport(this.props.report.list)} title={this.props.report.city.name}/>
                                  :null }
                        </div>
                      )}
                    </Transition>

              )
        }
}



/*****
  <TransitionGroup in={this.props.toggle} timeout={300}>
        <Transition in={this.state.currentview === "singledata"  && this.props.report}> <SingleData report={this.props.report}/></Transition >
        <Transition in={this.state.currentview === "graph"  && this.props.report} <GraphRep data={this.handleReport(this.props.report.list)} title={this.props.report.city.name}/> </Transition>
  </TransitionGroup>
***/



export default InfoBox
