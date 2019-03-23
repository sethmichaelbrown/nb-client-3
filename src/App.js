import React, { Component } from 'react';
import './App.css';

import { Route, Switch, BrowserRouter as Router } from 'react-browser-router'

import Home from './components/home/Home'
import Welcome from './components/Welcome'
import Editor from './components/editor/Editor'
import NotFound from './components/NotFound'
import MyPreferences from './components/home/MyPreferences'


class App extends Component {

  state = {
    selectedId: null,
    pacman: false
  }

  componentDidMount() {
    this.pacmanLoading()
  }

  pacmanLoading = () => {
    const allPrefs = JSON.parse(localStorage.getItem('defaultUserPrefs'))
    const user = localStorage.getItem('CognitoIdentityServiceProvider.43e59kat93rjn7fsptfkilhnpq.LastAuthUser')
    if (user) {
      this.setState({ pacman: allPrefs[`${user}`].pacman })
    }
  }


  selectBaseId = (event) => {
    const selectedId = event.target.id
    localStorage.setItem('lastSelectedBase', `${selectedId}`)
  }

  newBaseSelected = (id) => {
    localStorage.setItem('lastSelectedBase', `${id}`)
  }


  render() {
    return (

      <Router>
        <div className="App">
          <Route to='/' />

          <Switch>
            <Route exact path="/" component={Welcome} />

            <Route exact path="/preferences" render={() =>
              <MyPreferences
                pacmanLoading={this.pacmanLoading}
              />}
            />


            <Route exact path="/bases"
              render={() =>
                <Home
                  pacmanLoading={this.pacmanLoading}
                  pacman={this.state.pacman}
                  newBaseSelected={this.newBaseSelected}
                  selectBaseId={this.selectBaseId}
                />}
            />

            <Route exact path="/editor" render={() =>
              <Editor
                pacman={this.state.pacman}
                selectedId={this.state.selectedId}
              />}
            />

            <Route component={NotFound} />

          </Switch>
        </div>

      </Router >


    );
  }
}

export default App;
