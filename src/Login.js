import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import firebase from 'firebase';
import { firebaseApp } from './FirebaseConfig'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email_address: false,
      default_login: true,
      reset_password: false,
      email: '',
      password: '',
      change_email: ''
    }
  }

  login = (e) => {
    const { email, password } = this.state;
    //firebase
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then(
        user => {
          this.props.history.push('/post')
        },
        err => {
          this.props.history.push('/login')
          Swal.fire(
            'Oops...',
            `Login error: ${err.message}`,
            'error'
          )
        })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Container className="App">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                id='myEmail'
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="editorguestofdan@gmail.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                id='myPassword'
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                name="password"
                id="examplePassword"
                placeholder="123testme"
                autoFocus
              />
            </FormGroup>
          </Col>
          <div className="clearfix">
            <Button onClick={this.login} className="float-left">Submit</Button>
            <Button className="float-right">Forgot Password</Button>
          </div>
        </Form>
      </Container>
    );
  }
}


export default App;
