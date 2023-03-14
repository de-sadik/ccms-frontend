import React, { Component } from "react";
import './styles.css'

const title = [
  { title: "Total CCMS", description: 38 },
  { title: "Total On", description: 7 },
  { title: "Total Off", description: 31 }
];



class ThumbBox extends React.Component {
  render() {
    const boxDetails = this.props.title? this.props.title:title;
    return (
      <div class="row">
        {boxDetails.map((boxdetail, i) => {
          return (
            <div
              key={i}
              class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 "
              id="thumb"
            >
              <div class="thumbBox">
                <h4>{boxdetail.title}</h4>
                <p>{boxdetail.description}</p>
                <a href={boxdetail.url}>{boxdetail.link}</a>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ThumbBox;
