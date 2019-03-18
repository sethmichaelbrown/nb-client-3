import React, { Component } from 'react';
import '../../App.css';
import '../../styles/home.css'

import { withAuthenticator } from 'aws-amplify-react'
import { LinkContainer } from 'react-router-bootstrap'

import { Link } from 'react-browser-router'
import { API, Auth } from 'aws-amplify'
import uuid from 'uuid/v4'
import random from 'random-words'

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

  newBase = async (event) => {
    // event.preventDefault()
    const currentTime = moment().format()
    const newId = uuid()
    await API.post("notebase3API", "/bases", {
      body: {
        baseName: random({ exactly: 3, join: '-' }),
        codeLanguage: 'javascript',
        codeNote: this.state.newBaseCode,
        createdAt: `${currentTime}`,
        fontSize: '14',
        id: `${newId}`,
        modifiedAt: `${currentTime}`,
        textNote: this.state.newBaseText,
        theme: 'solarized_dark',
        username: this.state.username,
      }
    })
    this.getBases()
    this.props.newBaseSelected(newId)
    localStorage.setItem('lastSelectedBase', `${newId}`)
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
            <Link to='/editor'>
              <button type="button" onClick={() => this.newBase()} className="btn btn-outline-light btn-lg">Get Started</button>
            </Link>
          </div>

        </div>

        <div className="row">
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

