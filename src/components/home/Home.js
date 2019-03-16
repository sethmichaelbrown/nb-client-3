import React, { Component } from 'react';
import '../../App.css';
import '../../styles/home.css'

import { withAuthenticator } from 'aws-amplify-react'
import { Link } from 'react-browser-router'
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
    userPreferences: { theme: 'solarized_dark' },
    username: '',
  }

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ userInfo: user }))
      .catch(err => this.setState({ error: err }))
    const newState = { ...this.state }
    newState.username = newState.userInfo.username
    this.setState({ username: newState.username })
    this.getBases()

    // console.log('Home', this.state)
  }

  getBases = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    newState.userBases = response.filter(base => base.username === this.state.userInfo.username)
    this.setState({ userBases: newState.userBases })
    // console.log(this.state)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const length = (this.state.userBases.length + 1)
    const currentTime = moment().format()
    const newId = uuid()
    await API.post("notebase3API", "/bases", {
      body: {
        baseName: `new-base-6`,
        codeLanguage: 'javascript',
        codeNote: this.state.newBaseCode,
        createdAt: `${currentTime}`,
        id: `${newId}`,
        modifiedAt: `${currentTime}`,
        textNote: this.state.newBaseText,
        theme: 'solarized_dark',
        username: this.state.username,
      }
    })
    this.getBases()
    this.props.newBaseSelected(newId)

  }

  render() {
    return (

      <div className="Home">
        <NavBar />

        <div className="row container">
          <div className="col-md-4">
            <Greeting
              userBases={this.state.userBases}
              username={this.state.username} />
          </div>
          <div className="col-md-8 mt-2">
            <div className="create-btn new-base-btn">
              <Link to='/editor' onClick={this.handleSubmit} >
                Create New Base
              </Link>
            </div>
          </div>
        </div>

        <div className="row container">
          <div className="col-md-12">
            {this.state.userBases ?
              <ListView
                selectBaseId={this.props.selectBaseId}
                userBases={this.state.userBases} /> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthenticator(Home);

