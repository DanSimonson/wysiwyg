import React from "react";
import "./Definition.css";
function Definition(props) {
  console.log("props: ", props);

  let mappedDefinitions = null;
  if (props.results.results.results) {
    //this.setState({ isLoading: false });
    let results = props.results.results.results;
    console.log("results: ", results);
    //let inputValue = props.results["inputValue"];
    mappedDefinitions = results.map((result, i) => {
      return (
        <React.Fragment>
          <p className="italicMe">{result.partOfSpeech}</p>
          <p>Definition: {result.definition}</p>
        </React.Fragment>
      );
    });
  }

  return (
    <div>
      <p>{mappedDefinitions}</p>
    </div>
  );
}

export default Definition;
