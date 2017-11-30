import React, {Component} from "react"
import { select } from 'd3-selection'
import {scaleLinear, scaleBand } from "d3-scale"
import {min,max, range} from "d3-array"
import {transition} from "d3-transition"
import randomColor from "random-color"
class GraphRep extends Component{
        constructor(props){
          super(props)
          this.createBarChart = this.createBarChart.bind(this)
          this.renderPlaceholder = this.renderPlaceholder.bind(this)
          this.state = {
                complete:true,
                heightShift:2,
                widthShift:1,
                rectPadding:.2
          }

        }

        componentDidMount(){
              return this.state.complete ? this.createBarChart() : true
        }
        componentWillUpdate(newprops, newstate){
              //document.querySelector("svg").innerHTML = ""
        }
        componentDidUpdate(){
            return this.state.complete ? this.resizeChart(this.props.data) : true
        }
        renderPlaceholder(){

              return !this.state.complete ? (
                <div>
                      <h1>We are working on it</h1>
                </div>
              ):
              (
                        <div id="graph">
                          <svg ref={node => this.node = node}>
                          </svg>
                        </div>
              )

        }

        createBarChart(){


                var graph = document.getElementById("graph"),
                  data = this.props.data.map(function(d,i){

                    return d
                }),
                w = graph.clientWidth / this.state.widthShift,
                h = graph.clientHeight - 50,
                scaleLinearFunc = scaleLinear()
                .domain([min(data, (val)=>val.temperature) - 50, max(data, (val)=>val.temperature)])
                .range([0, (h / this.state.heightShift)]),
                scaleBandFunc = scaleBand().domain(range(0, data.length)).range([0, w]).padding(this.state.rectPadding),
                color = randomColor()

                var svg = select("svg")
                svg.attr("height", graph.clientHeight)
                .attr("viewbox","0 0 " + w + " " + h)
                .attr("width", w)
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", function(d,i ){ return  scaleBandFunc(i); })
                .attr("y", function(d, i){return h - scaleLinearFunc(d.temperature);  })
                .attr("height", function(d,i){ return scaleLinearFunc(d.temperature);  })
                .attr("width", scaleBandFunc.bandwidth())
                .attr("fill", function(d, i){ return i % 2 === 0 ? "rgb(20,20,20)": color.rgbString()})

                var t_shift = (scaleBandFunc.bandwidth() / 4 );
                svg.append("g")
                .attr("class", "temperature-text-group")
                .selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function(d,i){ return Math.round(d.temperature) + " F";})
                .attr("x", function(d,i ){ return scaleBandFunc(i) + t_shift } )
                .attr("y", function(d, i){return h - scaleLinearFunc(d.temperature) - 20 ; } )



                svg.append("g")
                .attr("class", "date-text-group")
                .selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function(d,i){ return d.date;})
                .attr("x", function(d,i ){ return  scaleBandFunc(i) + t_shift   ; } )
                .attr("y", function(d, i){return (h - scaleLinearFunc(d.temperature)) - 30 ; } )



                svg.selectAll("text")
                .attr("font-size", "10px")
                .attr("font-family", "Arial")
                .attr("style", "font-weight:bold;")
                .attr("fill","white")


                svg.append("text")
                .attr("id", "title-text")
                .text(this.props.title)
                .attr("x", w / 2)
                .attr("y", 30)
                .attr("fill", "white")
                .attr("font-size","large")
                this.chartlisteners()
        }

        resizeChart(chartdata){
              let data = chartdata ? chartdata : this.props.data
              var svg = select("svg"),
              graph = document.getElementById("graph"),
              w = graph.clientWidth / this.state.widthShift,
              h = graph.clientHeight - 50,
              scaleLinearFunc = scaleLinear()
              .domain([min(data, (val)=>val.temperature) - 50, max(data, (val)=>val.temperature)])
              .range([0, (h / this.state.heightShift) ]),
              scaleBandFunc = scaleBand().domain(range(0, data.length)).range([0, w]).padding(this.state.rectPadding),
              color = randomColor()

              svg.attr("height",  graph.clientHeight)
              .attr("viewbox","0 0 " + w + " " +  graph.clientHeight)
              .attr("width", w)
                var t_shift = (scaleBandFunc.bandwidth() / 4 );
              svg.selectAll("rect")
              .data(data)
              .transition(transition)
              .attr("fill", function(d, i){ return i % 2 === 0 ? "rgb(20,20,20)": color.rgbString()})
              .attr("x", function(d,i ){ return  scaleBandFunc(i); })
              .attr("y", function(d, i){return h - scaleLinearFunc(d.temperature);  })
              .attr("height", function(d,i){ return scaleLinearFunc(d.temperature);  })
              .attr("width", scaleBandFunc.bandwidth())

            svg.select(".temperature-text-group")
              .selectAll("text")
              .data(data)
              .text(function(d,i){ return Math.round(d.temperature) + " F";})
              .transition(transition)
              .attr("x", function(d,i ){ return scaleBandFunc(i) + t_shift; } )
              .attr("y", function(d, i){return h - scaleLinearFunc(d.temperature) - 20 ; } )

              svg.select(".date-text-group")
              .selectAll("text")
              .data(data)
              .text(function(d,i){ return d.date;})
              .transition(transition)
              .attr("x", (d, i)=> scaleBandFunc(i) + t_shift)
              .attr("y", function(d, i){return (h - scaleLinearFunc(d.temperature)) - 30; } )

              svg.select("#title-text")
              .text(this.props.title)
              .transition(transition)
              .attr("x", w / 2)
              .attr("y", 30)



        }

        chartlisteners(){
            /*  window.addEventListener("resize", (e)=>{
                    this.resizeChart()
              })
              */
        }

        render(){

          return      this.renderPlaceholder()

        }
}


export default GraphRep
