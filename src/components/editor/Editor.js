import React, { Component } from 'react'
import CodeEditor from './codeEditor/CodeEditor'
import { Link } from 'react-browser-router'

class Editor extends Component {

  componentDidMount = async () => {

  }

  render() {
    return (
      <div className="Editor">
        <Link to='/bases'>
          <button type="button" class="btn btn-outline-dark">Back to Bases</button>
        </Link>
        <CodeEditor />
      </div>
    )
  }
}

export default Editor