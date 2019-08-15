import React from "react";
import "./Synonyms.css";
function Synonyms(props) {
  console.log("props: ", props);

  let mappedSynonyms = null;
  if (props.results.results.results) {
    //this.setState({ isLoading: false });
    let results = props.results.results.results;
    console.log("results: ", results);
    mappedSynonyms = results.map((result, i) => {
      return <p>Synonym: / {result.synonyms} /</p>;
    });
  }

  return (
    <div>
      <p>{mappedSynonyms}</p>
    </div>
  );
}

export default Synonyms;
