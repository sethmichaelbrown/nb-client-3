import React, { Component } from 'react';
import './App.css';

import { API, Auth } from 'aws-amplify'
import { Link, Route, Redirect, Switch, BrowserRouter as Router } from 'react-browser-router'

import Home from './components/home/Home'
import Welcome from './components/Welcome'
import Editor from './components/editor/Editor'
import NotFound from './components/NotFound'


class App extends Component {

  state = {
    userInfo: null,
    username: '',
    error: null,
    redirect: false,
    selectedId: null,
    selectedBase: {},
    signedIn: false
  }

  componentDidMount = async () => {
    const boolVal = localStorage.getItem('amplify-authenticator-authState') === 'signedIn'
    this.setState({ signedIn: boolVal })
    // const newState = { ...this.state }
    // newState.username = newState.userInfo.username
    // this.setState({ username: newState.username })
  }

  selectBaseId = (event) => {
    const newState = { ...this.state }
    newState.selectedId = event.target.id
    this.setState({ selectedId: newState.selectedId })
  }

  onCodeChange = (codeValue) => {
    console.log(codeValue)
  }

  onTextChange = (textValue) => {
    console.log('Hello')
    console.log(textValue)
  }




  render() {
    return (

      <Router>
        <div className="App">
          <Route to='/' />


          <Switch>
            <Route exact path="/" component={Welcome} />

            <Route exact path="/bases"
              render={() =>
                <Home
                  selectBaseId={this.selectBaseId}
                  userInfo={this.state.userInfo}
                  username={this.state.username} />} />

            <Route exact path="/editor" render={() =>
              <Editor
                onCodeChange={this.onCodeChange}
                onTextChange={this.onTextChange}
                selectedId={this.state.selectedId} />} />

            <Route component={NotFound} />

          </Switch>
        </div>

      </Router >


    );
  }
}

export default App;
