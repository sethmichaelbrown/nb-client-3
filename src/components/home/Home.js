// Libraries
import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react'
import { Link } from 'react-browser-router'
import { API, Auth } from 'aws-amplify'

// External Tools
import uuid from 'uuid/v4'
import random from 'random-words'
import moment from 'moment'

// Components
import ListView from './ListView'
import NavBar from '../NavBar'
import Greeting from './Greeting'
import DeleteWarning from './DeleteWarning'

// Styles
import '../../App.css';
import '../../styles/home.css'

class Home extends Component {

  state = {
    newBaseCode: ' ',
    newBaseName: '',
    newBaseText: ' ',
    baseToDelete: {},
    displayUserPreferences: false,
    displayDeleteWarning: false,
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
  }

  getBases = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    newState.userBases = response.filter(base => base.username === this.state.userInfo.username)
    this.setState({ userBases: newState.userBases })
  }

  deleteBase = (event) => {
    const newState = { ...this.state }
    newState.displayDeleteWarning = true
    newState.baseToDelete = newState.userBases.find(base => base.id === event.target.id)
    this.setState({
      displayDeleteWarning: newState.displayDeleteWarning,
      baseToDelete: newState.baseToDelete
    })
  }

  confirmedDelete = async () => {
    await API.del("notebase3API", "/bases", {
    }).then(response => console.log(response)).catch(err => console.log(err))
  }

  closeDeleteModal = () => {
    const newState = { ...this.state }
    newState.displayDeleteWarning = false
    this.setState({ displayDeleteWarning: newState.displayDeleteWarning })
  }

  newBase = async () => {
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

  showUserPreferences = () => {
    const newState = { ...this.state }
    newState.displayUserPreferences = true
    this.setState({ displayUserPreferences: newState.displayUserPreferences })
    console.log(this.state)
  }


  render() {
    return (

      <div className="Home">
        <NavBar />
        <DeleteWarning
          baseToDelete={this.state.baseToDelete}
          confirmedDelete={this.confirmedDelete}
          closeDeleteModal={this.closeDeleteModal}
          displayDeleteWarning={this.state.displayDeleteWarning} />



        <div className="row container">
          <div className="col-md-4">
            <Greeting
              showUserPreferences={this.showUserPreferences}
              userBases={this.state.userBases}
              username={this.state.username} />
          </div>


          <div className="col-md-4 mt-2">
            <Link to='/editor'>
              <button type="button" onClick={() => this.newBase()} className="btn btn-outline-dark btn-lg">Create New Base</button>
            </Link>
          </div>

        </div>

        <div className="row">
          <div className="col-md-12">
            {this.state.userBases ?
              <ListView
                deleteBase={this.deleteBase}
                selectBaseId={this.props.selectBaseId}
                userBases={this.state.userBases} /> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthenticator(Home);

