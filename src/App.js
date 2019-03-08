import React, { Component } from 'react';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { Auth, API } from 'aws-amplify'
import uuid from 'uuid/v4'

import ListView from './components/ListView'


class App extends Component {

  state = {
    newBaseCode: ' ',
    newBaseName: '',
    newBaseText: ' ',
    userBases: [],
    selectedBase: {},
    username: ''
  }

  componentDidMount = async () => {
    this.getBases()
    const newState = { ...this.state }
    const userInfo = await Auth.currentAuthenticatedUser()
    newState.username = userInfo.username
    this.setState({ username: newState.username })
  }

  getBases = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    newState.userBases = response
    this.setState({ userBases: newState.userBases })
    console.log(this.state)
  }

  findId = (id) => {
    console.log(id)
    const base = this.state.userBases.find(base => base.id === id)
    return base
  }

  selectedBase = (event) => {
    const newState = { ...this.state }
    newState.selectedBase = this.findId(event.target.id)
    this.setState({ selectedBase: newState.selectedBase })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    console.log(this.state)
    await API.post("notebase3API", "/bases", {
      body: {
        id: uuid(),
        username: this.state.username,
        baseName: this.state.newBaseName,
        codeNote: this.state.newBaseCode,
        textNote: this.state.newBaseText,
        createdAt: Date.now().toString(),
        modifiedAt: Date.now().toString()
      }
    })
    this.getBases()
  }

  updateNewBaseState = (event) => {
    const newState = {...this.state}
    let target = event.target.id
    console.log(event.target.value)
   

    if(event.target.value === ''){
      console.log('Thats a big null you got there')
      event.target.value = ' '
    }

     newState[`${target}`] = event.target.value

    this.setState(newState)
  }

  // handleUpdate = async (event) => {
  //   event.preventDefault()
  //   console.log('Updating...')
  //   await API.put("notebase3API", "/bases", {
  //     body: newerBase
  //   })
  //   console.log('Done updating')
  // }

  // handleDelete = async (event) => {
  //   event.preventDefault()
  //   console.log('Deleting...')
  //   await API.delete("notebase3API", '/bases', {
  //     body: newBase
  //   })

  // }


  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-6">
            <div className="input">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="newBaseName">baseName</label>
                  <input onChange={this.updateNewBaseState} className="form-control" id="newBaseName" placeholder="Enter baseName" />
                </div>
                <div className="form-group">
                  <label htmlFor="newCodeNote">Code</label>
                  <input onChange={this.updateNewBaseState} className="form-control" id="newBaseCode" placeholder="Enter code" />
                </div>
                <div className="form-group">
                  <label htmlFor="newTextNote">Text</label>
                  <input onChange={this.updateNewBaseState} className="form-control" id="newBaseText" placeholder="Enter text" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={this.state.newBaseName ? '' : 'disabled'}>Submit</button>
              </form>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="row container">
          <div className="col-12">
            <ListView
              selectedBase={this.selectedBase}
              userBases={this.state.userBases} />
          </div>
        </div>

      </div>
    );
  }
}

export default withAuthenticator(App);
