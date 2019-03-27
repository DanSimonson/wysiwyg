import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link, withRouter } from "react-router-dom"
import './MyNavbar.css'
import Swal from 'sweetalert2'
import firebase from 'firebase';
import { firebaseApp } from '../FirebaseConfig'
const db = firebaseApp.firestore()

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);
    console.log('props: ', props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      url: '',
      results: [],
      displayName: ''
    };
  }
  gotData = (results) => {
    this.setState({
      results: results
    })

    // listen for auth status changes    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('gotData function state: ', this.state.results[0].id)
        console.log('auth change function state: ', this.state.results)
        //'WULAWM5MBjY9KcaEk2g9t1aOcB33/WULAWM5MBjY9KcaEk2g9t1aOcB33.jpg'
        let i;
        for (i = 0; i <= results.length - 1; i++) {
          if (user.uid === this.state.results[i].id) {
            console.log(this.state.results[i].displayname)
            //set display name
            this.setState({ displayName: this.state.results[i].displayname }, () => {
              console.log('state display name: ', this.state.results[i].displayname)
            })
            // Create a root reference
            var storageRef = firebase.storage().ref();
            storageRef.child(user.uid + '/' + user.uid + '.jpg').getDownloadURL().then(url => {
              //set image url
              this.setState({ url })
            }).catch(function (error) {
              // Handle any errors
            });
            //WULAWM5MBjY9KcaEk2g9t1aOcB33

          } else {
            //console.log('user logged out');

          }
        }
      }
    })
  }

  componentDidMount() {
    //array to hold database get results
    let results = []
    //getting data
    db.collection('users').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        results.push(doc.data())
      })
      this.gotData(results)
    })
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  signOut = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Exiting Application',
      text: "Are you sure you want to sign out",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Sign Out!'
    }).then((result) => {
      if (result.value) {
        firebaseApp.auth().signOut().then(function () {
          console.log('Signed Out');
        }, function (error) {
          console.error('Sign Out Error', error);
        });
        window.location = '/'
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar style={{ marginBottom: 1 + 'rem' }} className='mynav' expand="md">
          <NavbarBrand style={{ color: 'white' }} href="/">Dan's Wysiwyg Editor </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/*<NavItem onClick={this.signOut}>
                <NavLink to="/">Logout</NavLink>
              </NavItem>*/}
              {/*<NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>*/}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <span className="d-sm-inline-block d-none header-color text-uppercase user-name">Hello, <label className="font-weight-semibold">{this.state.displayName}</label></span>
                  {/**'../../assets/img/avatars/face6.jpg' */}
                  <img src={this.state.url} className="img-avatar mr-0" alt="user-photo" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.signOut}>
                    Logout
                  </DropdownItem>
                  {/*<DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>*/}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default MyNavbar
//export default withRouter(MyNavbar);