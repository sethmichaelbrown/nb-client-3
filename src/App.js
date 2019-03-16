import React, { Component } from 'react';
import './App.css';

import { Route, Switch, BrowserRouter as Router } from 'react-browser-router'

import Home from './components/home/Home'
import Welcome from './components/Welcome'
import Editor from './components/editor/Editor'
import NotFound from './components/NotFound'


class App extends Component {

  state = {
    selectedId: null,
  }

  componentDidMount = async () => {

  }

  selectBaseId = (event) => {
    const newState = { ...this.state }
    newState.selectedId = event.target.id
    this.setState({ selectedId: newState.selectedId })
    localStorage.setItem('lastSelectedBase', newState.selectedId)
  }

  newBaseSelected = (id) => {
    const newState = { ...this.state }
    newState.selectedId = id
    this.setState({ selectedId: newState.selectedId })
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
                  newBaseSelected={this.newBaseSelected}
                  selectBaseId={this.selectBaseId} />} />

            <Route exact path="/editor/" render={() =>
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
