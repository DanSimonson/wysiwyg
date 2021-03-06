import React, { Component } from "react";
import "./DocumentDisplay.css";
import MyNavbar from "./Components/MyNavbar";

import {
  BrowserRouter,
  HashRouter,
  Route,
  Switch,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Col,
  Row
} from "reactstrap";
import Swal from "sweetalert2";
//get draft.js stuff
import * as Draft from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//get firestore stuff
import firebase from "firebase";
import "firebase/firestore";
import { firebaseApp } from "./FirebaseConfig";
const db = firebaseApp.firestore();

export class DocumentDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: [],
      urlID: null,
      resultIndex: 0,
      editorState: Draft.EditorState.createEmpty()
    };
    console.log("props: ", this.props);
  }

  createWithRawContent = () => {
    let i;
    for (i = 0; i <= this.state.documents.length - 1; i++) {
      if (this.state.urlID === this.state.documents[i].id.seconds.toString()) {
        const contentState = Draft.convertFromRaw(
          this.state.documents[i].document
        );
        const newEditorState = Draft.EditorState.createWithContent(
          contentState
        );
        this.onEditorStateChange(newEditorState);
      }
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onEditorStateChange = newEditorState => {
    this.setState({ editorState: newEditorState });
  };

  componentDidMount() {
    let documents = [];
    let id = this.props.match.params.urlID;
    console.log("DD id: ", this.props.match.params.urlID);
    //getting data
    db.collection("editor")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          documents.push(doc.data());
        });
        this.gotData(documents);
      });
    //set document id in state
    this.setState({
      urlID: id
    });
  }

  gotData = documents => {
    this.setState({
      documents: documents
    });
    //render our database rich text inside the editor
    this.createWithRawContent();
  };
  //update database on save
  handleUpdate = e => {
    e.preventDefault();
    //get data
    let docData = [];
    let docID = [];
    const myUrlID = this.state.urlID;
    let convertMyData = Draft.convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save it!"
    }).then(result => {
      if (result.value) {
        db.collection("editor")
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              docData.push(doc.data());
              docID.push(doc.id);
            });
            let i;
            for (i = 0; i <= docData.length - 1; i++) {
              if (myUrlID === docData[i].id.seconds.toString())
                db.collection("editor")
                  .doc(docID[i])
                  .update({
                    document: convertMyData
                  });
            }
          });
        Swal.fire("Saved!", "Your file has been edited.", "success");
      }
    });
  };
  handleDelete = e => {
    e.preventDefault();
  };
  returnToDashboard = () => {
    //console.log('props: ',this.props)
    this.props.history.push("/post");
    //window.history.back()
    //window.history.go(-1)
  };
  getWord = () => {
    this.props.history.push("/dictionary");
  };

  render() {
    //onClick={this.saveDocument.bind(this)}
    const urlID = this.state.urlID;
    const results = this.state.documents;
    const { editorState } = this.state;

    const postList = results.map((result, index) => {
      if (urlID === result.id.seconds.toString()) {
        return (
          <Card key={result.id.seconds}>
            <CardBody>
              <CardTitle>File Name: {result.title}</CardTitle>
              <CardText>File Description: {result.description}</CardText>
              {/*<CardText>File text: {result.document.blocks["0"].text}</CardText>*/}
            </CardBody>
          </Card>
        );
      } else {
        return null;
      }
    });
    return (
      <div>
        <MyNavbar />
        {postList}

        <div className="action-section">
          <Row>
            <Col>
              <span className="save-button">
                <Link to="#">
                  <Button
                    onClick={this.handleUpdate}
                    className="btn-ghost-secondary btn-pill btn-action"
                  >
                    <i className="fa fa-save" /> Save Document
                  </Button>
                </Link>
              </span>
              <div className="float-me">
                <Button
                  style={{ marginRight: 1 + "rem" }}
                  onClick={this.returnToDashboard}
                  color="alt-primary"
                  className="btn-ghost-primary btn-secondary btn-pill btn-action"
                >
                  <i className="fa fa-home" /> Return to Dashboard
                </Button>
                {/*<Button
                  style={{ marginRight: 1 + "rem" }}
                  onClick={this.getWord}
                  color="alt-primary"
                  className="btn-ghost-primary btn-secondary btn-pill btn-action"
                >
                  <i className="fa fa-book" /> Dictionary
                </Button>*/}
              </div>
            </Col>
          </Row>
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/*<Button onClick={this.handleUpdate} color="alt-primary" size="sm" className="btn-pill"><i className="fa fa-save"></i> Save Changes</Button>
        <Button onClick={this.handleDelete} className="btn-ghost-danger"><i className="fa fa-trash"></i> Delete Document</Button>*/}
      </div>
    );
  }
}

export default DocumentDisplay;
