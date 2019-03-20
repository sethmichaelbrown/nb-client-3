import React, { Component } from 'react'

import NavBar from '../NavBar'
import CodeEditor from './codeEditor/CodeEditor'
import TextEditor from './textEditor/TextEditor'


import { API } from 'aws-amplify'
import moment from 'moment'
import EditableLabel from 'react-inline-editing'

import '../../styles/editor.css'


class Editor extends Component {

  state = {
    selectedBase: {},
    language: '',
    theme: '',
    code: '',
    text: '',
    name: '',
    fontSize: null,
    saved: ''
  }

  componentDidMount = async () => {
    this.fetch()
  }

  fetch = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    if (this.props.selectedId) {
      newState.selectedBase = response.filter(base => base.id === this.props.selectedId && base.deleteVal === false)
    }
    else {
      const storedId = localStorage.getItem('lastSelectedBase')
      newState.selectedBase = response.filter(base => base.id === storedId)
    }

    newState.code = newState.selectedBase[0].codeNote
    newState.fontSize = newState.selectedBase[0].fontSize
    newState.text = newState.selectedBase[0].textNote
    newState.theme = newState.selectedBase[0].theme
    newState.language = newState.selectedBase[0].codeLanguage

    this.setState({
      fontSize: newState.fontSize,
      text: newState.text,
      code: newState.code,
      selectedBase: newState.selectedBase,
      language: newState.language,
      theme: newState.theme
    })
    console.log(this.state)
  }

  updateDB = async () => {
    this.setState({ saved: false })
    const updateItem = { ...this.state.selectedBase[0] }

    updateItem.baseName = this.state.name
    updateItem.codeNote = this.state.code
    updateItem.codeLanguage = this.state.language
    updateItem.fontSize = this.state.fontSize
    updateItem.modifiedAt = moment().format()
    updateItem.textNote = this.state.text
    updateItem.theme = this.state.theme

    await API.put("notebase3API", "/bases", {
      body: updateItem
    }).then(response => response.success ? this.setState({ saved: true }) : '').catch(err => console.log(err))
  }


  onCodeChange = async (codeValue) => {
    const newState = { ...this.state }
    newState.code = codeValue
    await this.setState({ code: newState.code })
    this.updateDB()
  }

  onTextChange = async (textValue) => {
    const newState = { ...this.state }
    newState.text = textValue
    await this.setState({ text: newState.text })
    this.updateDB()
  }

  themeChange = async (event) => {
    const newState = { ...this.state }
    newState.theme = event.target.value
    await this.setState({ theme: newState.theme })
    this.updateDB()
  }

  languageChange = async (event) => {
    const newState = { ...this.state }
    newState.language = event.target.value
    await this.setState({ language: newState.language })
    this.updateDB()
  }

  fontSizeChange = async (event) => {
    const newState = { ...this.state }
    newState.fontSize = parseInt(event.target.value)
    await this.setState({ fontSize: newState.fontSize })
    this.updateDB()
  }

  deleteOnNameChange = async () => {
    const deleteItem = { ...this.state.selectedBase[0] }
    deleteItem.deleteVal = true

    await API.put("notebase3API", "/bases", {
      body: deleteItem
    })
  }

  _handleFocusOut = async (text) => {
    const newState = { ...this.state }
    newState.name = text
    await this.setState(newState)
    this.deleteOnNameChange()
    this.updateDB()
  }


  render() {
    return (
      <div className="Editor" >
        <NavBar />
        <div className="row editor-header-row container my-2">
          <div className="col-md-12">
            {this.state.selectedBase[0] ?
              <EditableLabel
                text={this.state.selectedBase[0].baseName}
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                inputWidth='200px'
                inputHeight='25px'
                inputMaxLength={50}
                labelFontWeight='bold'
                inputFontWeight='bold'
                onFocusOut={this._handleFocusOut}
              /> : ''}
            {/* {this.state.selectedBase[0] ?
              <h3>{this.state.selectedBase[0].baseName}
                {this.state.saved !== '' ?
                  this.state.saved ? <span className="ml-2 saved-text">All Changes Saved</span> : <span className="ml-2 saved-text">Saving...</span> : ''}
              </h3> : ''} */}
          </div>
        </div>

        <div className="row ">
          <div className="col-md-6">
            <TextEditor
              onChange={this.onChange}
              textVal={this.state.textVal}
              onTextChange={this.onTextChange}
              selectedBase={this.state.selectedBase} />
          </div>

          <div className="col-md-6">
            <CodeEditor
              onChange={this.onChange}
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