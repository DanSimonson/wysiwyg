import React, { Component } from "react";
import Swal from "sweetalert2";
import "./Dictionary.css";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
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
  componentDidMount() {}

  handleChange = e => {
    //console.log("e: ", e);
    this.setState({ inputValue: e.target.value }, () => {
      //console.log("this.state.inputValue: ", this.state.inputValue);
    });
  };

  handleClick = () => {
    if (this.state.inputValue !== undefined) {
      let temp = this.state.inputValue;
      let URL = `https://wordsapiv1.p.mashape.com/words/${temp}/definition`;
      //console.log("URL: ", URL);
      axios
        .get(URL, {
          headers: {
            "X-Mashape-Key":
              "dbwwCjBPvPmshUBqeoOKBqHdFjw2p1h6XhFjsnyJvxW781cP5G",
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
          Swal.fire({
            type: "error",
            title: "SERVER  ERROR",
            text: `${error}... Have you entered an english word?`
          });
          this.setState({ inputValue: "" });
        });
    }
  };

  openCity = (evt, name) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
  };

  handleKeyDown = e => {
    /*console.log("e.key: ", e.key);*/
    //this.setState({ inputValue: e.target.value }, () => {
    //console.log("this.state.inputValue: ", this.state.inputValue);
    //});
    //console.log("in handleKeyDown with event: ", e.target.name);
    //let { name, value, type } = e.target;
    //if (e.keyCode === 13) {
    //console.log("do validate: ", e.target.value);
    /*let URL = "https://wordsapiv1.p.mashape.com/words/dog/definition";
      axios
        .get(URL, {
          headers: {
            "X-Mashape-Key":
              "dbwwCjBPvPmshUBqeoOKBqHdFjw2p1h6XhFjsnyJvxW781cP5G",
            Accept: "application/json"
          }
        })
        .then(response => {
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
        });*/
  };

  render() {
    //onKeyDown={this.handleKeyDown}
    return (
      <div className="wrap-all">
        <div className="dictionary-container">
          <div className="box">
            <p id="label-dictionary">Dictionary</p>
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleChange}
              name="dictionary"
              id="dictionary-input"
            />
            <i
              onClick={e => {
                this.handleClick(e);
              }}
              className="makeRoom fa fa-search"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="main-content" />
        <div class="tab">
          <button
            className="tablinks"
            onClick={e => this.openCity(e, "definition")}
          >
            Definition
          </button>
          <button
            className="tablinks"
            onClick={e => this.openCity(e, "synonyms")}
          >
            Synonyms
          </button>
          <button
            className="tablinks"
            onClick={e => this.openCity(e, "antonyms")}
          >
            Antonyms
          </button>
          <button
            className="tablinks"
            onClick={e => this.openCity(e, "examples")}
          >
            Examples
          </button>
        </div>
        <div className="returned-info">
          <div id="definition" class="tabcontent">
            <h3>Definition</h3>
            <p>Definition is...</p>
          </div>
          <div id="synonyms" class="tabcontent">
            <h3>Synonym</h3>
            <p>Synonym is...</p>
          </div>

          <div id="antonyms" class="tabcontent">
            <h3>Antonym</h3>
            <p>Antonym is...</p>
          </div>

          <div id="examples" class="tabcontent">
            <h3>Examples</h3>
            <p>Examples are...</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dictionary;
