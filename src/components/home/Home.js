import React, { Component } from 'react';
import '../../App.css';
import '../../styles/home.css'

import { withAuthenticator } from 'aws-amplify-react'
import { Link, Route, Redirect, Switch, BrowserRouter as Router } from 'react-browser-router'
import { API, Auth } from 'aws-amplify'
import uuid from 'uuid/v4'

import ListView from './ListView'
import NavBar from '../NavBar'
import Greeting from './Greeting'
import moment from 'moment'


class Home extends Component {

  state = {
    newBaseCode: ' ',
    newBaseName: '',
    newBaseText: ' ',
    selectedBase: {},
    userBases: [],
    userInfo: {},
    username: '',
  }

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ userInfo: user }))
      .catch(err => this.setState({ error: err }))
    
    this.getBases()

    console.log('Home', this.state)

  }

  getBases = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    newState.userBases = response.filter(base => base.username === this.state.userInfo.username)
    this.setState({ userBases: newState.userBases })
    console.log(this.state)
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
        createdAt: moment()._d,
        modifiedAt: moment()._d
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

        {this.state.userBases ?
          <ListView
            selectBaseId={this.props.selectBaseId}
            userBases={this.state.userBases} /> : ''}
      </div>


    );
  }
}

export default withAuthenticator(Home);
// export default Home;
