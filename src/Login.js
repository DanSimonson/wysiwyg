import React, { Component } from 'react';
import './Login.css'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row
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
    this.myRef = React.createRef();
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

  handlePasswordChange = event => {
    this.setState({ [event.target.name]: event.target.value });    
  }

  toggleForgot_password = () => {
    this.setState({
      email_address: !this.state.email_address,
      default_login: !this.state.default_login,
    })
  }
  focusInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    //this.myRef.current.focus();
    //this.myRef.current.value = ''
  }

  resetPassword = (e) => {
    const auth = firebaseApp.auth();
    let emailAddress = this.state.change_email;
    let timerInterval
    console.log(auth)
    Swal.fire({
      title: `Sending Confirmation Email to ${emailAddress}`,
      html: 'Closing in <strong></strong>',
      timer: 2000,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong')
            .textContent = Swal.getTimerLeft()
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.timer
      ) {
          // Email sent
          //this.toggleForgot_password();
          //this.focusInput()
          auth.sendPasswordResetEmail(emailAddress).then(function() {
          
          }).catch(function(error) {
            // An error happened..
            Swal.fire(
              'Oops...',
              `${emailAddress} is not a valid login email address`,
              'error'
            )
        })      
      }
    })
    e.preventDefault()
  }

  render() {
    return (
      <Container className="App">
        <h2>Sign In</h2>
        {
        this.state.default_login &&
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
          {/** */}
          
          
          <div className="clearfix">
            <Button onClick={this.login} className="float-left">Submit</Button>
            <Button onClick={this.toggleForgot_password.bind(this)} className="float-right">Forgot Password</Button>
          </div>
        </Form>
        }        
        {
        this.state.email_address &&
          <Form className="mx-5 pb-4">
            <Row>
              <Col xl="12">
                {/**onChange={this.handleChange} */}
                <FormGroup>
                  <Label >Email Address</Label>
                  <Input 
                  onChange={this.handlePasswordChange} 
                  name="change_email"
                  type="email" 
                  placeholder="Enter Email Address"
                  ref={this.myRef}
                  autoFocus/>
                </FormGroup>
              </Col>
              <Col xl="12"  className="text-right">
              {/*onClick={this.toggleForgot_password.bind(this)} */}
              {/**onClick={this.toggleForgot_password.bind(this)} */}
              <Link to="/login">
                  <Button onClick={this.toggleForgot_password.bind(this)} color="alt-secondary"  className=" shadow action-btn"> Back</Button>
                </Link>
                <Link to="#" >
                  <Button onClick={this.resetPassword} color="alt-success" className="shadow action-btn"> Submit</Button>
                </Link>
              </Col>
            </Row>
          </Form>
      }
          <div className='row-manage'></div>
        <Card className='card-manage'>
          <CardText>Guest User Name: editorguestofdan@gmail.com</CardText>
          <CardText>Password: 123testme.</CardText>
        </Card>
      </Container>
      
    );
  }
}


export default App;
