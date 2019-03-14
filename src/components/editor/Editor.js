import React, { Component } from 'react'

import NavBar from '../NavBar'
import CodeEditor from './codeEditor/CodeEditor'
import TextEditor from './textEditor/TextEditor'

import { Link } from 'react-browser-router'
import { API } from 'aws-amplify'

class Editor extends Component {

  state = {
    selectedBase: {}
  }

  componentDidMount = async () => {
    const newState = { ...this.state }
    const response = await API.get('notebase3API', '/bases')
    const sBase = response.filter(base => base.id === this.props.selectedId)
    newState.selectedBase = sBase
    this.setState({ selectedBase: newState.selectedBase })
    // console.log(this.state)
  }

  render() {
    return (
      <div className="Editor">
        <NavBar />
          <Link to='/bases'>
            <button type="button" className="btn btn-outline-dark">Back to Bases</button>
          </Link>
          <div className="row">
            <div className="col-md-6">
              <TextEditor
                selectedBase={this.state.selectedBase} />
            </div>

            <div className="col-md-6">
              <CodeEditor
                onCodeChange={this.props.onCodeChange}
                selectedBase={this.state.selectedBase} />
            </div>
          </div>


      </div>
        )
      }
    }
    
export default Editor