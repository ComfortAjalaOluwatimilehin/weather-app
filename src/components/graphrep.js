import React, {Component} from "react"
import { select } from 'd3-selection'


class GraphRep extends Component{
        constructor(props){
          super(props)
          this.createBarChart = this.createBarChart.bind(this)
          this.renderPlaceholder = this.renderPlaceholder.bind(this)
          this.state = {
                complete:false
          }

        }

        componentDidMount(){
              this.state.complete ? this.createBarChart() : true
        }
        componentWillUpdate(newprops, newstate){
              //document.querySelector("svg").innerHTML = ""
        }
        componentDidUpdate(){

                this.state.complete ? this.createBarChart() : true
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
                  scale = 5,
                  data = this.props.data.map(function(d,i){
                    d.temperature = d.temperature * scale;
                    return d
                }),
                w = graph.clientWidth - 50,
                h = graph.clientHeight - 50,
                rectPadding = 2,
                rectWidth =Math.round(w / this.props.data.length) - Math.round(rectPadding * this.props.data.length)
                var svg = select("svg")
                svg.attr("height", h)
                .attr("viewbox","0 0 " + w + " " + h)
                .attr("width", w)
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", function(d,i ){ return  Math.round((rectWidth + rectPadding) * i) })
                .attr("y", function(d, i){return Math.round( h - d.temperature); })
                .attr("height", function(d,i){ return Math.round(d.temperature, 2); })
                .attr("width", rectWidth)
                .attr("fill", function(d, i){ return i % 2 === 0 ? "#08304b": "rgb(7, 40, 63)"})


                svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function(d,i){ return Math.round(d.temperature) + " F";})
                .attr("font-family", "Arial")
                .attr("x", function(d,i ){ return  Math.round((rectWidth + rectPadding) * i) + 30; } )
                .attr("y", function(d, i){return Math.round( h - d.temperature) + 20 ; } )
                .attr("fill", "white")
                .attr("text-anchor","middle")
                .attr("class", "bar-text-temp")

                svg.append("g")
                .selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function(d,i){ return d.date;})
                .attr("font-family", "Arial")
                .attr("x", function(d,i ){ return  Math.round((rectWidth + rectPadding) * i) + 30; } )
                .attr("y", function(d, i){return Math.round( h - d.temperature) + 50 ; } )
                .attr("fill", "white")
                .attr("text-anchor","middle")
                .attr("class", "bar-text-date")

                svg.append("text")
                .text(this.props.title)
                .attr("font-size", "2vw")
                .attr("font-family", "Arial")
                .attr("fill", "white")
                .attr("x", w / 4)
                .attr("y", 50)
        }

        render(){

          return      this.renderPlaceholder()

        }
}


export default GraphRep
