import React, { Component } from 'react';
// import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { Auth, API } from 'aws-amplify'
import uuid from 'uuid/v4'

import ListView from './ListView'
import NavBar from '../NavBar'


class Home extends Component {

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
    this.setState({ username: this.props.userInfo.username })
  }

  getBases = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    const bases = response.filter(base => base.username === this.state.username)
    newState.userBases = bases
    this.setState({ userBases: newState.userBases })
  }

  findId = (id) => {
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
    this.clearInputs()

  }

  clearInputs = () => {
    this.baseName.value = ''
    this.codeNote.value = ''
    this.textNote.value = ''
  }

  updateNewBaseState = (event) => {
    const newState = { ...this.state }
    let target = event.target.id

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
      <div className="Home">
        <NavBar />
        {/* {console.log(this.props)} */}

        <ListView
          userBases={this.state.userBases} />
      </div>
    );
  }
}

export default withAuthenticator(Home);
