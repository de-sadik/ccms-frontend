import React from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
// import {Chart, ArcElement} from 'chart.js'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import './styles.css'
// Chart.register(ArcElement);



class PieChart extends React.Component {
  
  render() {
    console.log(this.props.data)
    return (
      <div class="col-12 col-sm-6" className="col-md-4">
        <Card>
          <h5>ON / OFF </h5>
          <Pie data={this.props.data}
          width={10}
          height={5}
          />
        
        </Card>
      </div>
    );
  }
}

export default PieChart;
