import React, { Component } from 'react';
import './App.css';

// import { withAuthenticator } from 'aws-amplify-react'
import { Auth, API } from 'aws-amplify'
import uuid from 'uuid/v4'
import { Route, Redirect, Link, Switch, BrowserRouter as Router } from 'react-browser-router'

import ListView from './components/ListView'
import Home from './components/home/Home'
import Welcome from './components/Welcome'
import NotFound from './components/NotFound'


class App extends Component {

  state = {
    userInfo: null,
    error: null
  }

  componentDidMount = async () => {
    const userInfo = await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ userInfo: user }))
      .catch(err => this.setState({ error: err }));
  }




  render() {
    return (
      <Router>
        <div className="App">

          {!this.state.userInfo ?
            <Redirect to='/welcome' /> : <Redirect to='/bases' />
          }



          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/bases" component={Home} />
             <Route component={NotFound} />
          </Switch>

        </div>
      </Router >
    );
  }
}

export default App;
