import React, {Component} from "react"
import {Transition, CSSTransition, TransitionGroup } from "react-transition-group"
import SingleData from "./singledata"
import GraphRep from "./graphrep"

const switchbuttons = [
  {ID:"graphrepbutton",onclickargs:"graph", itext:"timeline"},
  {ID:"sharetwitterbutton",onclickargs:"share", itext:"favorite"},
  {ID:"singledatabutton",onclickargs:"singledata", itext:"label"}
]


const duration = 500;

const transitionStyles = {
  entering: { opacity: 0, transform:"translateY(50px)" },
  entered:  { opacity: 1, transform:"translateY(0px)" },
};

const defaultStyles = {
  transition:`transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
}

const FadeIn = ({in:inProp, children})=>(
  <Transition in={inProp} timeout={duration}>
      {children}
  </Transition>
)




class InfoBox extends Component{

        constructor(props){
            super(props)
            this.handleReport = this.handleReport.bind(this)
            this.switchBox =this.switchBox.bind(this)
            this.displayBox = this.displayBox.bind(this)
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
        displayBox(){
          let component = null
          switch(this.state.currentview){
              case "singledata":
                component = <SingleData report={this.props.report}/>
              break;
              case "graph":
                component = <GraphRep data={this.handleReport(this.props.report.list)} title={this.props.report.city.name}/>
              break;
              default:
                break;
          }
          return component
        }
        render(){

              return (
                  <Transition in={this.props.toggle} timeout={300}>
                      {(state)=>(
                        <div id="infobox" style={{...transitionStyles[state]}}>
                              {switchbuttons.map((but, i)=><div key={i} id={but.ID} className="infoboxbuttons" onClick={()=>this.switchBox(but.onclickargs)}><i className="material-icons">{but.itext}</i></div>  )}
                              <div id="closeinfo" className="infoboxbuttons"><i className="material-icons" onClick={this.props.closeInfoBox}>close</i></div>
                              {this.props.report ? this.displayBox() : null }
                        </div>
                      )}
                    </Transition>

              )
        }
}



export default InfoBox
