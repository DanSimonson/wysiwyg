import React from "react";

function Definition(props) {
  console.log("props: ", props);
  //let isLoading = true;
  /*const mappedPets = props.pets.map((pet, i) => {
    console.log(pet);
    return (
      <div>
        <p>Pet Name: {pet.name}</p>
        <p>Pet Breed: {pet.breed}</p>
      </div>
    );
  });*/
  let mappedDefinitions = null;
  if (props.results.results.results) {
    //this.setState({ isLoading: false });
    let results = props.results.results.results;
    console.log("results: ", results);
    let inputValue = props.results["inputValue"];
    mappedDefinitions = results.map((result, i) => {
      //console.log(result);
      return (
        <div>
          <p>{result.partOfSpeech}</p>
          <p>Definition: {result.definition}</p>
        </div>
      );
    });
  }
  // props.results.results.results
  if (props.results.results.results) {
    //console.log("results: ", results);
    //console.log("resuls.partOfSpeech: ", props.results.results.results[0].partOfSpeech);
    //console.log("props in definition: ", props);
    //console.log("results in definition: ", props.results[0].synonyms);
  }

  /***getting inputValule */
  //console.log("inputValue in definition...: ", props.results.inputValue);
  //console.log("inputValue in definition...: ", props.results["inputValue"]);

  return (
    <div>
      <p>{mappedDefinitions}</p>
    </div>
  );
}

export default Definition;
