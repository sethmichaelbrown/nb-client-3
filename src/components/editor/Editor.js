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
    newBaseName: 'Name Goes Here',
    codeVal: '',
    textVal: ''
  }

  componentDidMount = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    const sBase = response.filter(base => base.id === this.props.selectedId)
    newState.selectedBase = sBase
    this.setState({
      selectedBase: newState.selectedBase,
      codeVal: newState.selectedBase.codeNote,
      textVal: newState.selectedBase.textNote
    })
    // console.log(this.state)
  }

  handleUpdate = async () => {
    // console.log('Connected')
    // 
    // const updateItem = {...this.state.selectedBase[0]}
    // updateItem.codeNote = this.state.codeVal
    // updateItem.textNote = this.state.textVal
    // 
    // await API.put("notebase3API", "/bases", {
    //   body: updateItem
    // })
  }

  onCodeChange = async (codeValue) => {
    const currentTime = moment().format()
    const updateItem = { ...this.state.selectedBase[0] }

    updateItem.codeNote = `${codeValue}`
    console.log(updateItem.codeNote)
    updateItem.modifiedAt = currentTime

    await API.put("notebase3API", "/bases", {
      body: updateItem
    })

  }

  onTextChange = async (textValue) => {
    const currentTime = moment().format()
    const updateItem = { ...this.state.selectedBase[0] }

    updateItem.textNote = `${textValue}`
    console.log(updateItem.codeNote)
    updateItem.modifiedAt = currentTime

    await API.put("notebase3API", "/bases", {
      body: updateItem
    })
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
              </h3>
              : ''}


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