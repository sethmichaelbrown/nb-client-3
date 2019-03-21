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
  }

  componentDidMount = async () => {

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

            <Route exact path="/preferences" component={MyPreferences} />

            <Route exact path="/bases"
              render={() =>
                <Home
                  newBaseSelected={this.newBaseSelected}
                  selectBaseId={this.selectBaseId} />} />

            <Route exact path="/editor" render={() =>
              <Editor
                selectedId={this.state.selectedId} />} />

            <Route component={NotFound} />

          </Switch>
        </div>

      </Router >


    );
  }
}

export default App;
