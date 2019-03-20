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
import Loading from './Loading'
import ListViewHeader from './ListViewHeader'

// Styles
import '../../App.css';
import '../../styles/home.css'

class Home extends Component {

  state = {
    baseToDelete: {},
    displaySearchBox: false,
    displayUserPreferences: false,
    displayDeleteWarning: false,
    filterString: '',
    newBaseCode: ' ',
    newBaseName: '',
    newBaseText: ' ',
    selectedBase: {},
    sortByVal: ['baseName', 'up'],
    userBases: [],
    userInfo: {},
    userPreferences: { theme: 'solarized_dark' },
    username: '',
    noBases: false,
    err: null
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
    if (response.length === 0) {
      newState.noBases = true
    }
    newState.userBases = response.filter(base => base.username === this.state.userInfo.username && base.deleteVal !== true)
    this.setState({
      userBases: newState.userBases,
      noBases: newState.noBases
    })
    console.log(this.state)
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
    const updateItem = { ...this.state.baseToDelete }
    updateItem.deleteVal = true

    await API.put("notebase3API", "/bases", {
      body: updateItem
    }).then(response => console.log(response)).catch(err => this.setState({ err: err }))
    const lastId = localStorage.getItem('lastSelectedBase')

    if (lastId === updateItem.id) {
      localStorage.removeItem('lastSelectedBase')
    }
    if (this.state.userBases.length === 0) {
      const newState = { ...this.state }
      newState.noBases = true
      this.setState({ noBases: newState.noBases })
    }
    this.closeDeleteModal()
    this.getBases()
  }

  closeDeleteModal = () => {
    const newState = { ...this.state }
    newState.displayDeleteWarning = false
    this.setState({ displayDeleteWarning: newState.displayDeleteWarning })
  }

  newBase = async () => {
    const newId = uuid()
    localStorage.setItem('lastSelectedBase', `${newId}`)
    const currentTime = moment().format()
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
  }

  showUserPreferences = () => {
    const newState = { ...this.state }
    newState.displayUserPreferences = true
    this.setState({ displayUserPreferences: newState.displayUserPreferences })
  }

  showSearchBox = () => {
    const newState = { ...this.state }
    newState.displaySearchBox = true
    this.setState({ displaySearchBox: newState.displaySearchBox })
  }

  search = (event) => {
    const newState = { ...this.state }
    newState.filterString = event.target.value
    this.setState({ filterString: newState.filterString })
  }

  backToIcon = () => {
    const newState = { ...this.state }
    newState.displaySearchBox = false
    this.setState({ displaySearchBox: newState.displaySearchBox })
  }

  sortBy = (event) => {
    const val = event.target.id
    const newState = { ...this.state }
    newState.sortByVal[0] = val
    let sortedBases = []

    if (this.state.sortByVal[1] === 'up') {
      newState.sortByVal[1] = 'down'
      sortedBases = newState.userBases.sort((a, b) => (a[`${val}`] > b[`${val}`]) ? -1 : ((b[`${val}`] > a[`${val}`]) ? -1 : 0));
    }
    else {
      newState.sortByVal[1] = 'up'
      sortedBases = newState.userBases.sort((a, b) => (a[`${val}`] > b[`${val}`]) ? 1 : ((b[`${val}`] > a[`${val}`]) ? -1 : 0));
    }

    this.setState({
      userBases: sortedBases,
      sortByVal: newState.sortByVal
    })
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

          <div className="col-md-4 my-2 ml-2">
            <Link to='/editor'>
              <button type="button" onClick={() => this.newBase()} className="btn btn-outline-dark btn-lg new-base-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
              </button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <ListViewHeader
              sortBy={this.sortBy}
              displaySearchBox={this.state.displaySearchBox}
              showSearchBox={this.showSearchBox}
              search={this.search}
              backToIcon={this.backToIcon}
              sortByVal={this.state.sortByVal} />

            {this.state.noBases ?
              <div className="noBases">No Bases!</div>
              :
              this.state.userBases.length > 0 ?
                <ListView
                  filterString={this.state.filterString}
                  deleteBase={this.deleteBase}
                  selectBaseId={this.props.selectBaseId}
                  userBases={this.state.userBases} />
                :
                <div className="row justify-content-center">
                  <div className="loading mt-5"><Loading /></div>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthenticator(Home);

