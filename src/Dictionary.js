import React, { Component } from "react";
import "./Dictionary.css";

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ""
    };
    //console.log(props);
  }
  render() {
    return (
      <div>
        <h1>Dictionary</h1>
      </div>
    );
  }
}

export default Dictionary;
