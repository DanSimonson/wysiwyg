import React, { Component } from 'react'
import './Post.css'
import MyNavbar from './Components/MyNavbar'
import {
  Card, CardImg, CardText, CardBody, Table, FormGroup,
  CardTitle, CardSubtitle, Button, Label, Input, Form, Container, Row, Col
} from 'reactstrap';
import { BrowserRouter, HashRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
//import DocumentDisplay from './DocumentDisplay'
import Swal from 'sweetalert2'
//get draft.js stuff
import * as Draft from "draft-js";
//import { Editor } from 'react-draft-wysiwyg';
//get firestore stuff
import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseApp } from './FirebaseConfig'
const db = firebaseApp.firestore()



class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      urlID: null,
      //new input for search
      searchInput: '',
      filteredResults: [],
      checkedDocumentID: '',

    }
    this.showResults = this.showResults.bind(this);
  }
  componentDidMount() {
    //array to hold database get results
    let results = []
    //getting data
    db.collection('editor').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        results.push(doc.data())
      })
      this.gotData(results)
    })
  }

  gotData = (results) => {
    this.setState({
      results: results
    })
  }
  handleDelete = () => {
    let checkedDocumentID = this.state.checkedDocumentID
    console.log(checkedDocumentID);
    let docData = []
    let docID = []
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.value) {
        db.collection("editor").get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            docData.push(doc.data());
            docID.push(doc.id)
          });
          let i;
          for (i = 0; i <= docData.length - 1; i++) {
            console.log('database array document id: ', docData[i].id.seconds)
            console.log('state document id: ', checkedDocumentID.toString())
            if (checkedDocumentID === docData[i].id.seconds.toString()) {
              db.collection('editor').doc(docID[i]).delete()
            }
          }
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
      this.reloadPage()
    })

  }
  reloadPage = () => {
    let timerid = setTimeout(() => {
      document.location.reload()
    }, 3000);

  }

  showResult = (e) => {
    const { searchInput } = this.state
    let results = this.state.results
    const filteredResult = results.filter((el) => {
      return (el.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1)
    })
    this.setState({
      filteredResults: filteredResult,
      searchInput: ''
    })
  }

  handleSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });
  }

  onCheckedChange = (e) => {
    this.setState({ checkedDocumentID: e.target.value })
  }

  showResults = () => {
    var results = this.state.results;
    if (this.state.filteredResults.length > 0) {
      results = this.state.filteredResults;
    }
    if (results.length > 0) {
      var arr = [];
      for (var i in results) {
        arr.push(<tr key={i}>
          <td>
            <FormGroup check inline className="tbl-check">
              <Input onChange={this.onCheckedChange} className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value={results[i].id.seconds} />
            </FormGroup>
          </td>
          <td className="text-center dms-td"><i className="fa fa-star-o"></i></td>

          <td className="dms-td font">
            <Link to={"/" + results[i].id.seconds}>
              <p className="fileName_td">{results[i].title}</p>
            </Link>
            <small className="text-muted">Current Version: 2.3</small>
          </td>
          {/*<td className="dms-td">
            <img className="img-avatar img-sm mx-auto d-block" src="../../assets/img/avatars/face6.jpg" />
        </td>*/}
          <td className="text-justify">
            {results[i].description}<span className="text-primary">...Read More</span>
          </td>
          {/*<td className="dms-td font-weight-bold">Approved</td>*/}
        </tr>);
      }
      return arr;
    }
  }

  render() {
    const results = this.state.results
    const filteredResults = this.state.filteredResults
    const { searchInput } = this.state
    let postList = []

    return (
      <div>
        <MyNavbar/>
        {/*<Container className='top-container'>
          <Row>
            <Col xs="3"></Col>
            <Col>
              <div className="action-section">
                <div className="clearfix">
                  <div className="float-left">
                    <span>
                      <Link to="/views/documents_warehouse/new_document/new_document">
                        <Button className="btn-ghost-primary"><i className="fa fa-plus"></i> New</Button>
                      </Link>
                    </span>
                    <span className="boundary">|</span>
                    {/*<span>
                    <Link to="#">
                      <Button className="btn-ghost-secondary"><i className="fa fa-folder"></i> Save</Button>
                    </Link>
                  </span>
                  <span className="boundary">|</span>
                    <span>
                      <Link to="#">
                        <Button onClick={this.handleDelete} className="btn-ghost-danger"><i className="fa fa-trash"></i> Move to Trash</Button>
                      </Link>
                    </span>
                    <span className="boundary">|</span>
                    {/*<span>
                    <Link to="#">
                      <Button className="btn-ghost-info"><i className="fa fa-share-alt"></i> Share</Button>
                    </Link>
                  </span>
                  <span className="boundary">|</span>
                    <span>
                      <Link to="/views/documents_warehouse/upload_files/upload_files">
                        <Button className="btn-ghost-light"><i className="fa fa-cloud-upload"></i> File Upload</Button>
                      </Link>
                    </span>
                    <span className="boundary">|</span>
                    <span>
                      <Link to="#">
                        <Button className="btn-ghost-primary"><i className="fa fa-cloud-download"></i> File Download</Button>
                      </Link>
                    </span>
                  </div>
                  {/*<div className="float-right">
                  <span>
                    <Link to="#">
                      <Button className="btn-ghost-primary"><i className="fa fa-cloud-download"></i></Button>
                    </Link>
                  </span>
                  <span className="boundary">|</span>
                  <span>
                    <Link to="#">
                      <Button className="btn-ghost-secondary"><i className="fa fa-print"></i></Button>
                    </Link>
                  </span>
                </div>
                </div>
              </div>
            </Col>
            <Col xs="2"></Col>
          </Row>
        </Container>*/}
        <div className='post-spacer'></div>
        <Container fluid={false} className='bottom-container fluid'>
          <Input id='search' type="text" value={this.state.searchInput} onChange={this.handleSearchInput} placeholder="Search" />
          <Button onClick={this.showResult} color="alt-primary" className="btn-ghost-primary btn-secondary btn-pill btn-action "><icon className="fa fa-search"></icon> Search</Button>
          <span className="boundary">|</span>
          <Button onClick={() => document.location.reload()} color="alt-primary" className="btn-ghost-primary btn-secondary btn-pill btn-action"><icon className="fa fa-refresh"></icon> Reset</Button>
          <div className="float-right">
          <span>
            <Link to="/newdocument">
              <Button className="btn-ghost-primary"><i className="fa fa-plus"></i> New</Button>
            </Link>
          </span>
          <span className="boundary">|</span>
          {/*<span>
                    <Link to="#">
                      <Button className="btn-ghost-secondary"><i className="fa fa-folder"></i> Save</Button>
                    </Link>
                  </span>
                  <span className="boundary">|</span>*/}
          <span>
            <Link to="#">
              <Button onClick={this.handleDelete} className="btn-ghost-danger"><i className="fa fa-trash"></i> Move to Trash</Button>
            </Link>
          </span>
          <span className="boundary">|</span>
          <span className="boundary">|</span>
          {/*<span>
                    <Link to="#">
                      <Button className="btn-ghost-info"><i className="fa fa-share-alt"></i> Share</Button>
                    </Link>
                  </span>
                  <span className="boundary">|</span>*/}
          <span>
            <Link to="/views/documents_warehouse/upload_files/upload_files">
              <Button className="btn-ghost-light"><i className="fa fa-cloud-upload"></i> File Upload</Button>
            </Link>
          </span>
          <span className="boundary">|</span>
          <span>
            <Link to="#">
              <Button className="btn-ghost-primary"><i className="fa fa-cloud-download"></i> File Download</Button>
            </Link>
          </span>
          </div>
        </Container>

        <div className="tbl-scroll">
          <Table hover responsive>
            <thead>
              <tr>
                <th className="dms-th">
                  {/*<FormGroup check inline className="tbl-check">
                    <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                  </FormGroup>*/}
                </th>
                <th className="dms-th"></th>
                <th className="dms-th">File Name</th>
                {/*<th className="dms-th">Created By</th>*/}
                <th className="dms-th">File Description</th>
                {/*<th className="dms-th">Status</th>*/}
              </tr>
            </thead>
            <tbody>
              {this.showResults()}
            </tbody>
          </Table>
          <div className="cover-bar"></div>
        </div>
      </div>
    )
    // return (
    //   <div>
    //     <Container fluid>
    //       <Row>
    //         <Col xs="1"></Col>
    //         <Col>
    //           <Input id='search' type="text" value={this.state.searchInput} onChange={this.handleSearchInput} placeholder="Search" />
    //         </Col>
    //         <Col xs="1"></Col>
    //       </Row>
    //       <Row>
    //         <Col xs="1"></Col>
    //         <Col>
    //           <Button onClick={this.showResult} color="alt-primary" className="btn-ghost-primary btn-secondary btn-pill btn-action "><icon className="fa fa-search"></icon> Search</Button>
    //           <Button onClick={() => document.location.reload()} color="alt-primary" className="btn-ghost-primary btn-secondary btn-pill btn-action"><icon className="fa fa-refresh"></icon> Reset</Button>
    //         </Col>
    //         <Col xs="1"></Col>
    //       </Row>
    //     </Container>
    //     {postList}
    //   </div>
    // )
  }
}

export default Post