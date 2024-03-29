import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import './styles.css'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2' 
// Chart.register(CategoryScale);
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Active load",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class Linechart extends React.Component {
  render() {
    return (
      <div class="col-12 col-sm-6" >
        <Card>
          <h5>Load Timeline</h5>
          <Line data={data} />
        </Card>
      </div>
    );
  }
}

export default Linechart;
