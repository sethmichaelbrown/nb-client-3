import React, { Component } from 'react';
import './App.css';

import { Auth } from 'aws-amplify'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-browser-router'

import Home from './components/home/Home'
import Welcome from './components/Welcome'
import Editor from './components/editor/Editor'
import NotFound from './components/NotFound'


class App extends Component {

  state = {
    userInfo: null,
    error: null,
    redirect: true,
  }

  componentDidMount = async () => {
    const userInfo = await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ userInfo: user }))
      .catch(err => this.setState({ error: err }));
  }

  nullRedirect = () => {
    const newState = { ...this.state }
    newState.redirect = false
    this.setState({ redirect: newState.redirect })
  }




  render() {
    return (
      <Router>
        <div className="App">

          {this.state.redirect ?
            this.state.userInfo ?
              <Redirect to='/bases' /> : <Redirect to='/welcome' />
            : ''}




          <Switch>
            <Route exact path="/welcome" component={Welcome} />

            <Route exact path="/editor"
              component={() =>
                <Editor />} />

            <Route exact path="/bases"
              component={() =>
                <Home
                  nullRedirect={this.nullRedirect}
                  userInfo={this.state.userInfo} />} />

            <Route component={NotFound} />
          </Switch>

        </div>
      </Router >
    );
  }
}

export default App;
