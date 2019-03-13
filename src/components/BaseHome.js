import React, { Component } from 'react';
// import './BaseHome.css';

import { Auth } from 'aws-amplify'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-browser-router'

import Home from './home/Home'
import Welcome from './Welcome'
import Editor from './editor/Editor'
import NotFound from './NotFound'


class BaseHome extends Component {

  state = {
    userInfo: null,
    error: null,
    redirect: false,
  }

  componentDidMount = async () => {
    const userInfo = await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ userInfo: user }))
      .catch(err => this.setState({ error: err }));

    // const localVal = localStorage.getItem('CognitoIdentityServiceProvider.43e59kat93rjn7fsptfkilhnpq.LastAuthUser')
    // if (!localVal) {
    //   this.setState({ redirect: true })
    // }


  }





  render() {
    return (
      <Router>
        <div className="BaseHome">
          {console.log(this.state.redirect)}


          {!this.state.userInfo ?
            <Redirect to='/welcome' /> : <Redirect to='/bases' />}




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

export default BaseHome;