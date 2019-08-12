import React, { Component } from "react";
import "./Dictionary.css";
const axios = require("axios");

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      results: {}
    };
    //console.log(props);
  }
  componentDidMount() {
    /*let URL = "https://wordsapiv1.p.mashape.com/words/dog/definition";
    axios
      .get(URL, {
        headers: {
          "X-Mashape-Key": "dbwwCjBPvPmshUBqeoOKBqHdFjw2p1h6XhFjsnyJvxW781cP5G",
          Accept: "application/json"
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    /*fetch("https://wordsapiv1.p.mashape.com/words/dog/definition")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          results: result.results
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )*/
    /*var unirest = require("unirest");
    unirest
      .get("https://wordsapiv1.p.mashape.com/words/dog/definition")
      .header(
        "X-Mashape-Key",
        "dbwwCjBPvPmshUBqeoOKBqHdFjw2p1h6XhFjsnyJvxW781cP5G"
      )
      .header("Accept", "application/json")
      .end(function(result) {
        /*this.setState(
            {
              results: result
            },
            () => {
              console.log(this.state.results);
            }
          );
        console.log(result.status, result.headers, result.body);
      });*/
  }

  handleChange = e => {};
  handleKeyDown = e => {
    /*console.log("e.key: ", e.key);*/
    this.setState({ inputValue: e.target.value }, () => {
      //console.log("this.state.inputValue: ", this.state.inputValue);
    });
    console.log("in handleKeyDown with event: ", e.target.name);
    //let { name, value, type } = e.target;
    if (e.keyCode === 13 || e.target.name === "dictionary") {
      console.log("do validate: ", e.target.value);
    }
    let URL = "https://wordsapiv1.p.mashape.com/words/dog/definition";
    axios
      .get(URL, {
        headers: {
          "X-Mashape-Key": "dbwwCjBPvPmshUBqeoOKBqHdFjw2p1h6XhFjsnyJvxW781cP5G",
          Accept: "application/json"
        }
      })
      .then(response => {
        console.log("response.data: ", response.data);
        this.setState(
          {
            results: response.data
          },
          () => {
            console.log("this.state.results: ", this.state.results);
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="dictionary-container">
        <div className="box">
          <p id="label-dictionary">Dictionary</p>
          <input
            type="text"
            value={this.state.inputValue}
            name="dictionary"
            id="dictionary-input"
            onKeyDown={this.handleKeyDown}
            onClick={e => {
              this.handleKeyDown(e);
            }}
            onChange={this.handleKeyDown}
          />
          <i className="makeRoom fa fa-search" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default Dictionary;
