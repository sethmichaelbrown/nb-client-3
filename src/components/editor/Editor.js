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
    language: '',
    theme: '',
    code: '',
    fontSize: 0,
  }

  componentDidMount = async () => {
    this.fetch()
    console.log(this.state)
  }

  fetch = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    if (this.props.selectedId) {
      newState.selectedBase = response.filter(base => base.id === this.props.selectedId)
    }
    else {
      const storedId = localStorage.getItem('lastSelectedBase')
      newState.selectedBase = response.filter(base => base.id === storedId)
    }
   
    newState.code = newState.selectedBase[0].codeNote
    newState.fontSize = newState.selectedBase[0].fontSize
    newState.theme = newState.selectedBase[0].theme
    newState.language = newState.selectedBase[0].codeLanguage

    this.setState({
      fontSize: newState.fontSize,
      code: newState.code,
      selectedBase: newState.selectedBase,
      language: newState.language,
      theme: newState.theme
    })
    console.log(this.state)
  }



  onCodeChange = async (codeValue) => {
    const currentTime = moment().format()
    const updateItem = { ...this.state.selectedBase[0] }

    updateItem.codeNote = `${codeValue}`
    updateItem.modifiedAt = currentTime

    // console.log('Code', updateItem)
    await API.put("notebase3API", "/bases", {
      body: updateItem
    })
  }

  onTextChange = async (textValue) => {
    const currentTime = moment().format()
    const updateItem = { ...this.state.selectedBase[0] }

    updateItem.textNote = `${textValue}`
    updateItem.modifiedAt = currentTime

    // console.log('Text', updateItem)
    await API.put("notebase3API", "/bases", {
      body: updateItem
    })
  }

  themeChange = (event) => {
    const newState = { ...this.state }
    const value = event.target.value
    newState.theme = value
    this.setState({ theme: newState.theme })
    this.updateEditorProperties('theme', value)
  }

  languageChange = (event) => {
    const newState = { ...this.state }
    const value = event.target.value
    newState.language = value
    this.setState({ language: newState.language })
    this.updateEditorProperties('language', value)
  }

  fontSizeChange = (event) => {
    const newState = { ...this.state }
    const value = event.target.value
    newState.fontSize = parseInt(value)
    this.setState({ fontSize: newState.fontSize })
    console.log(this.state)
    this.updateEditorProperties('fontSize', value)
  }

  updateEditorProperties = async (type, val) => {
    const currentTime = moment().format()
    const updateItem = { ...this.state.selectedBase[0] }

    updateItem.modifiedAt = currentTime

    if (type === 'language') {
      updateItem.codeLanguage = val
    }
    else if(type === 'theme') {
      updateItem.theme = val
    }
    else{
      updateItem.fontSize = val
    }

    await API.put("notebase3API", "/bases", {
      body: updateItem
    })
  }


  render() {
    return (
      <div className="Editor" >
        <NavBar />
        <div className="row editor-header-row container my-2">
          <div className="col-md-12">
            {this.state.selectedBase[0] ?
              <h3>{this.state.selectedBase[0].baseName}
                {this.state.changesSaved ? <small>All Changes Saved</small> : ''}
              </h3> : ''}
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
              fontSize={this.state.fontSize}
              code={this.state.code}
              language={this.state.language}
              theme={this.state.theme}
              themeChange={this.themeChange}
              languageChange={this.languageChange}
              fontSizeChange={this.fontSizeChange}
              onCodeChange={this.onCodeChange}
              selectedBase={this.state.selectedBase} />
          </div>
        </div>


      </div>
    )
  }
}

export default Editor