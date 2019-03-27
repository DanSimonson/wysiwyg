import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Link, NavLink, Redirec } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import DocumentDisplay from './DocumentDisplay'
import Dashboard from './Dashboard'
import Post from './Post'
import NewDocument from './NewDocument'
import MyNavbar from './Components/MyNavbar'

class App extends Component {
  render() {
    return (
      <div>                
        <BrowserRouter>        
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/" name="Login Page" component={Login} />
            <Route exact path="/Components/MyNavbar" name="MyNavbar" component={MyNavbar} />
            <Route exact path="/newdocument" name="NewDocument" component={NewDocument} />
            <Route exact path="/Components/MyNavbar" name="MyNavbar" component={MyNavbar} />
            <Route exact path="/post" name="Post" component={Post} />
            <Route exact path="/:urlID" component={DocumentDisplay} />

            {/*<Route exact path="/DocumentDisplay" name="DocumentDisplay" component={DocumentDisplay} />
            <Route exact path="/login" name="Login Page" component={Login} />
    <Route path="/Post" exact component={Post}/>*/}


            {/*<Route path="/Post" exact component={Post}/>
            <Route path="/DocumentDisplay" exact component={DocumentDisplay}/>
            <Route path="/:urlID" component={DocumentDisplay}/>
            <Route exact path='/' component={Home} />
            <Route exact path='/ChuckNorris' component={ChuckNorris} />
            <Route path='/:id' component={ChuckNorris} />
            <Route path="/Components/Post" exact component={Post}/>
            <Route path="/:urlID" component={DocumentDisplay}/>
            <Route exact path="/Views/documentdisplay" name="" component={Login} />
            <Route path="/" name="Home" component={DefaultLayout} />
            <Route exact path="/dashboard" name="Dashboard" component={dashboard} />
            <Route path='/view_documents' name='Documents Warehouse' exact component={view_documents} />
            <Route path="/Post" exact component={Post}/>
            <Route path="/DocumentDisplay" exact component={DocumentDisplay}/>
            <Route path="/:urlID" component={DocumentDisplay}/>*/}
          </Switch>

        </BrowserRouter>
      </div>


    );
  }
}

export default App;

