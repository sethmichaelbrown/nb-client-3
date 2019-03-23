// Libraries
import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react'
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
import CreateRecents from './CreateRecents'
import PacmanLoader from './PacmanLoader'



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
    username: '',
    noBases: false,
    err: null,
  }

  componentDidMount() {
    this.onHomeLoad()
    if (!JSON.parse(localStorage.getItem('defaultUserPrefs'))) {
      this.noDefaultPrefs()
    }
    this.getBases()
  }

  noDefaultPrefs = () => {
    const userPrefs = {
      language: 'javascript',
      theme: 'solarized_dark',
      previewText: "console.log('Hello World!')",
      fontSize: '14',
      liveAutoCompletion: true,
      highlightActiveLine: true
    }
    const user = localStorage.getItem('CognitoIdentityServiceProvider.43e59kat93rjn7fsptfkilhnpq.LastAuthUser')
    let allPrefs = {}
    allPrefs[`${user}`] = userPrefs
    localStorage.setItem('defaultUserPrefs', JSON.stringify(allPrefs))
  }

  onHomeLoad = async () => {
    const user = await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ userInfo: user }))
      .catch(err => this.setState({ error: err }))
    const newState = { ...this.state }
    newState.username = newState.userInfo.username
    this.setState({ username: newState.username })
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
    const allPrefs = JSON.parse(localStorage.getItem('defaultUserPrefs'))
    const userPrefs = allPrefs[this.state.username]
    await API.post("notebase3API", "/bases", {
      body: {
        baseName: random({ exactly: 3, join: '-' }),
        codeLanguage: `${userPrefs.language}`,
        codeNote: this.state.newBaseCode,
        createdAt: `${currentTime}`,
        fontSize: `${userPrefs.fontSize}`,
        id: `${newId}`,
        modifiedAt: `${currentTime}`,
        textNote: this.state.newBaseText,
        theme: `${userPrefs.theme}`,
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
      sortedBases = newState.userBases.sort((a, b) => (a[`${val}`] > b[`${val}`]) ? -1 : ((b[`${val}`] > a[`${val}`]) ? 1 : 0))
    }
    else {
      newState.sortByVal[1] = 'up'
      sortedBases = newState.userBases.sort((a, b) => (a[`${val}`] > b[`${val}`]) ? 1 : ((b[`${val}`] > a[`${val}`]) ? -1 : 0))
    }

    this.setState({
      userBases: sortedBases,
      sortByVal: newState.sortByVal
    })
  }



  render() {
    return (
      <div className="Home">

        <div className="navbar-cont"><NavBar /></div>

        <DeleteWarning
          baseToDelete={this.state.baseToDelete}
          confirmedDelete={this.confirmedDelete}
          closeDeleteModal={this.closeDeleteModal}
          displayDeleteWarning={this.state.displayDeleteWarning} />

        <div className="greeting-cont">
          <Greeting
            showUserPreferences={this.showUserPreferences}
            userBases={this.state.userBases}
            username={this.state.username} />
        </div>

        <div className="createRecents-cont mt-2">
          <CreateRecents
            selectBaseId={this.props.selectBaseId}
            newBase={this.newBase}
            userBases={this.state.userBases} />
        </div>

        <div className="listViewHeader-cont mt-3">
          <ListViewHeader
            sortBy={this.sortBy}
            displaySearchBox={this.state.displaySearchBox}
            showSearchBox={this.showSearchBox}
            search={this.search}
            backToIcon={this.backToIcon}
            sortByVal={this.state.sortByVal} />
        </div>


        {this.state.noBases ?
          <div className="noBases-cont">
            <h4 className='noBase-text'>No Bases!</h4>
            <h5 className='noBase-text'>Get started with the New Base button above</h5>
          </div>
          :
          this.state.userBases.length > 0 ?
            <div className="listView-cont">
              <ListView
                filterString={this.state.filterString}
                deleteBase={this.deleteBase}
                selectBaseId={this.props.selectBaseId}
                userBases={this.state.userBases} />
            </div>
            :
            <div className="loading-cont">
              {this.props.pacman ? <PacmanLoader size={50} /> : <Loading />}
            </div>}


      </div>
    )
  }
}

export default withAuthenticator(Home);

