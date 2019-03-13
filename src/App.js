import React, { Component } from 'react';
import './App.css';

import { Auth } from 'aws-amplify'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-browser-router'

import Home from './components/home/Home'
import Welcome from './components/Welcome'
import Editor from './components/editor/Editor'
import NotFound from './components/NotFound'

import BaseHome from './components/BaseHome'


class App extends Component {

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

      <div className="App">
        <BaseHome
          userInfo={this.state.userInfo} />
      </div>


    );
  }
}

export default App;
