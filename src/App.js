import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import DocumentDisplay from './Views/DocumentDisplay'
import Dashboard from './Dashboard'
class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div>
          
          <Switch>
            <Route path="/" name="Dashboard" component={Dashboard} />
            <Route exact path="/DocumentDisplay" name="DocumentDisplay" component={DocumentDisplay} />
            <Route exact path="/login" name="Login Page" component={Login} />
            
            {/*<Route path="/Components/Post" exact component={Post}/>
            <Route path="/:urlID" component={DocumentDisplay}/>
            <Route exact path="/Views/documentdisplay" name="" component={Login} />
            <Route path="/" name="Home" component={DefaultLayout} />
            <Route exact path="/dashboard" name="Dashboard" component={dashboard} />
            <Route path='/view_documents' name='Documents Warehouse' exact component={view_documents} />
            <Route path="/Post" exact component={Post}/>
            <Route path="/DocumentDisplay" exact component={DocumentDisplay}/>
    <Route path="/:urlID" component={DocumentDisplay}/>*/}
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
