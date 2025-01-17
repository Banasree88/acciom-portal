import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class GaugeChart extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    console.log("gaugeChartValue render ", this.props);
    const options = {
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '97%',
                    margin: 5,
                    shadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#000000',
                        opacity: 1,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        show: true
                    },   
                    value: {
                        offsetY: 15,
                        fontSize: '0px'
                    }                     
                }
            }
        },
        fill: {
            type: 'solid',
            colors: this.props.color
        },
        series: [this.props.percentage],
        labels: [this.props.percentage + '%']
        
    };

    return (

      <div className="DQIprojectGauge ">  
        <Chart options={options} series={options.series} type="radialBar" width={this.props.width ? this.props.width : 300}/>
        <span className={this.props.class}>{this.props.name}</span>
      </div>
    );
  }
}

export default GaugeChart;
