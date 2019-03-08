import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { API } from 'aws-amplify'
import uuid from 'uuid/v4'

const newBase = {
  id: uuid(),
  username: 'sethmb',
  baseName: 'noteBase2',
  codeNote: "const funcThing = () => console.log('Hello!')",
  textNote: 'Fat arrow function',
  createdAt: Date.now().toString(),
  modifiedAt: Date.now().toString()
}

const newerBase = {
  id: '09234092834092049802938440928340',
  username: 'sethmb',
  baseName: 'noteBase2',
  codeNote: "let x = 1",
  textNote: 'variable declaration',
  createdAt: Date.now().toString(),
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
      body: newBase
    })
  }

  handleUpdate = async event => {
    event.preventDefault()
    console.log('Updating...')
    await API.put("notebase3API", "/bases", {
      body: newerBase
    })
    console.log('Done updating')
  }

  handleDelete = async (event) => {
    event.preventDefault()
    console.log('Deleting...')
    await API.delete("notebase3API", '/bases', {
      body: newBase
    })

  }


  render() {
    return (
      <div className="App">
        <button onClick={this.handleSubmit}>New Base</button>
        <br />
        <br />
        <button onClick={this.handleUpdate}>Update</button>
        <br />
        <br />
        <button onClick={this.handleDelete}>Delete</button>

      </div>
    );
  }
}

export default withAuthenticator(App);
