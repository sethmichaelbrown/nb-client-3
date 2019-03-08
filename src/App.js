import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { API } from 'aws-amplify'

const newBase = {
  username: 'sethmb',
  baseName: 'noteBase2',
  codeNote: "const funcThing = () => console.log('Hello!')",
  textNote: 'Fat arrow function',
  createAt: Date.now().toString(),
  modifiedAt: Date.now().toString()
}

class App extends Component {

  componentDidMount = async () => {
    const response = await API.get('notebase3API', '/bases')
    console.log(response)
  }

  handleSubmit = async event => {
    event.preventDefault()
    console.log('Posting...')
    await API.post("notebase3API", "/bases", {
      body: {
        username: 'sethmb',
        baseName: 'noteBase2',
        codeNote: "const funcThing = () => console.log('Hello!')",
        textNote: 'Fat arrow function',
        createAt: Date.now().toString(),
        modifiedAt: Date.now().toString()
      }
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <button onClick={this.handleSubmit}>New Base</button>
      </div>
    );
  }
}

export default withAuthenticator(App);
