import React, { Component, lazy, Suspense } from 'react';
import './NewDocument.css'
import MyNavbar from './Components/MyNavbar'
import { Link } from 'react-router-dom';
//import { Bar, Line } from 'react-chartjs-2';
import Swal from 'sweetalert2'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter, CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  CardGroup,
  FormGroup,
  Input,
  InputGroupAddon,
  Pagination,
  PaginationItem,
  PaginationLink,
  InputGroup,
  Fade,
  Collapse, Label, Form, Breadcrumb, BreadcrumbItem, TabContent, TabPane, Nav, NavItem, NavLink, Popover, PopoverBody, PopoverHeader, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
//get draftjs wysiwyg stuff
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg"
//get firestore stuff
import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseApp } from './FirebaseConfig'
const db = firebaseApp.firestore()
//db.settings({ timestampsInSnapshots: true })

class new_document extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  constructor(props) {
    super(props);
    //this.displayData = [];
    this.state = {
      addField: true,
      saveDocument: false,
      //showData: this.displayData,
      editorState: EditorState.createEmpty(),
      //convertedData: {},
      id: new Date(),
      title: '',
      description: ''
    }
  };
  handleSubmit = (e) => {
    e.preventDefault()

    //adding data
    let convertMyData = convertToRaw(this.state.editorState.getCurrentContent())
    let myDate = new Date();
    this.setState({ id: myDate })
    db.collection('editor').add({
      document: convertMyData,
      id: myDate,
      description: this.state.description.toString(),
      title: this.state.title.toString()
    })
    //clear form 
    this.setState({
      editorState: '',
      description: '',
      title: '',
    }, () =>
        console.log(this.state))
    this.saveDocument()
    Swal.fire(
      'Saved!',
      'Your Document was Saved.',
      'information'
    )
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  saveDocument = () => {
    this.setState({
      saveDocument: !this.state.saveDocument,
    });
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div> 
      <MyNavbar/>
      {/*<Button color="alt-primary" size="sm" className="btn-pill" onClick={this.saveDocument.bind(this)}><i className="fa fa-save"></i> Save New Document</Button>*/}
      <div className="animated fadeIn spacer">
        <div className="float-left text-right">
          <Button color="alt-primary" size="sm" className="btn-pill" onClick={this.saveDocument.bind(this)}><i className="fa fa-save"></i> Save New Document</Button>
        </div>
        <Form>
          <div className="file_name_here">
            <div className="clearfix">
              <div className="float-left">
                <div className="d-flex"></div>
              </div>
              <div className="float-left text-right"></div>
            </div>
          </div>
          <div className="row-file pb-0">
            <Col xl="12" className="no-px file_viewer">
              <div className="file_action">
                <div className="clearfix">
                  <div className="float-left"></div>
                  <div className="float-right"></div>
                </div>
              </div>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </Col>
          </div>
        </Form >
        <Modal isOpen={this.state.saveDocument} toggle={this.saveDocument.bind(this)} >
          <ModalHeader toggle={this.saveDocument.bind(this)}>Save New Document</ModalHeader>
          <ModalBody>
            <Form className="editor-input">
              <Row>
                <Col xl="12">
                  <FormGroup>
                    <Label className="font-weight-semibold">File Name:</Label>
                    <Input type="text" value={this.state.title} id="title" placeholder="Enter File Name" onChange={this.handleChange} defaultValue="Untitled_File" autoFocus />
                  </FormGroup>
                  <FormGroup>
                    <Label className="font-weight-semibold">File Location:</Label>
                    <div className="clearfix">
                      <div className="float-left">
                        <Label>Folder_B6</Label>
                      </div>
                      <div className="float-right">
                        <Link to="#"><i className="fa fa-pencil"></i> Edit</Link>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label className="font-weight-semibold">Save As:</Label>
                    <FormGroup check>
                      <Input className="form-check-input" type="radio" id="saveAs" name="saveAs" defaultChecked />
                      <Label className="form-check-label" check>Version 1.0 Draft</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input className="form-check-input" type="radio" id="saveAs" name="saveAs" />
                      <Label className="form-check-label" check>Version 1.0 for Approval</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input className="form-check-input" type="radio" id="saveAs" name="saveAs" />
                      <Label className="form-check-label" check>Template</Label>
                    </FormGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label className="font-weight-semibold">Description:</Label>
                    <Input type="textarea" value={this.state.description} id="description" onChange={this.handleChange} placeholder="Enter Description" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="font-weight-semibold">Tags:</Label>
                    <Input type="text" placeholder="Enter Tags" />
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <FormGroup className="text-right">
                    <Button color="alt-danger" size="sm" className="btn-pill" onClick={this.saveDocument.bind(this)}><i className="fa fa-close"></i> Cancel</Button>
                    <Link to="/views/documents_warehouse/list_documents/list_documents">
                      <Button onClick={this.handleSubmit} color="alt-primary" size="sm" className="btn-pill"><i className="fa fa-check"></i> Save Document</Button>
                    </Link>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
      </div>
    );
  }
}

export default new_document;
