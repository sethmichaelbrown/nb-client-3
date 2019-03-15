import React, { Component } from 'react'

import NavBar from '../NavBar'
import CodeEditor from './codeEditor/CodeEditor'
import TextEditor from './textEditor/TextEditor'

import { Link } from 'react-browser-router'
import { API } from 'aws-amplify'
import moment from 'moment'

import '../../styles/editor.css'


class Editor extends Component {

  state = {
    changesSaved: false,
    selectedBase: {},
  }

  componentDidMount = async () => {
    this.fetch()

  }

  fetch = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    newState.selectedBase = response.filter(base => base.id === this.props.selectedId)
    this.setState({ selectedBase: newState.selectedBase })
  }

  // Bug
  // Because updateItem is pulling from state, the updated values aren't present if you type before the call/ response.
  // Ideally, both of these actions would happen in the same function
  // How do to get codeValue and textValue in the same function? 

  onCodeChange = async (codeValue) => {
    const currentTime = moment().format()
    const updateItem = { ...this.state.selectedBase[0] }

    updateItem.codeNote = `${codeValue}`
    updateItem.modifiedAt = currentTime

    console.log('Code', updateItem)
    await API.put("notebase3API", "/bases", {
      body: updateItem
    })
  }

  onTextChange = async (textValue) => {
    const currentTime = moment().format()
    const updateItem = { ...this.state.selectedBase[0] }

    updateItem.textNote = `${textValue}`
    updateItem.modifiedAt = currentTime

    console.log('Text', updateItem)
    await API.put("notebase3API", "/bases", {
      body: updateItem
    })
  }

  themeChange = () => {
    console.log('Connected')
  }

  languageChange = () => {
    console.log('Connected')
  }


  render() {
    return (
      <div className="Editor" >
        <NavBar />
        <div className="row editor-header-row container my-2">
          <div className="col-md-10">
            {this.state.selectedBase[0] ?
              <h3>{this.state.selectedBase[0].baseName}
                {this.state.changesSaved ? <small>All Changes Saved</small> : ''}
              </h3> : ''}

          </div>
          <div className="col-md-2">
            <Link to='/bases'>
              <button type="button" className="btn btn-outline-dark">Back to Bases</button>
            </Link>
          </div>

        </div>

        <div className="row ">
          <div className="col-md-6">
            <TextEditor
              textVal={this.state.textVal}
              onTextChange={this.onTextChange}
              selectedBase={this.state.selectedBase} />
          </div>

          <div className="col-md-6">
            <CodeEditor
              themeChange={this.themeChange}
              languageChange={this.languageChange}
              codeVal={this.state.codeVal}
              onCodeChange={this.onCodeChange}
              selectedBase={this.state.selectedBase} />
          </div>
        </div>


      </div>
    )
  }
}

export default Editor