import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import '../../../styles/codeEditor.css'

const modes = [
  "java",
  "javascript",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "coffee",
  "css",
  "django",
  "haskell",
  "json",
  "pascal",
  "ruby"].sort()

const themes = [
  "ambiance",
  "chaos",
  "clouds",
  "clouds_midnight",
  "cobalt",
  "dawn",
  "dreamweaver",
  "eclipse",
  "github",
  "merbivore",
  "mono_industrial",
  "pastel_on_dark",
  "solarized_dark",
  "solarized_light",
  "tomorrow",
  "tomorrow_night",
  "tomorrow_night_eighties",
  "twilight",
  "vibrant_ink",
  "xcode"
].sort()

const fontSize = [8, 10, 12, 14, 16, 18]

class CodeEditorToolbar extends Component {

  state = {
    value: ''
  }

  handleChange(event) {
    const newState = { ...this.state }
    newState.value = event.target.value
    this.setState({ value: event.target.value })
  }


  render() {
    console.log(this.props.selectedBase.codeLanguage)
    return (
      <div className="CodeEditorToolbar">
        <div className="ql-toolbar ql-snow">
          <span className='ql-formats'>
            <div className="row">
              <div className="col-md-4">
                <Form.Control className='ql-picker-label' as="select" onChange={this.props.languageChange} defaultValue={this.props.selectedBase.codeLanguage}>
                  {modes.map((lang, idx) => <option value={lang} key={idx}>{lang}</option>)}
                </Form.Control>
              </div>

              <div className="col-md-5">
                <Form.Control className='ql-picker-label' as="select" onChange={this.props.themeChange} defaultValue={this.props.selectedBase.theme}>
                  {themes.map((theme, idx) => <option value={theme} key={idx}>{theme.split('_').join(' ')}</option>)}
                </Form.Control>
              </div>

               <div className="col-md-3">
                <Form.Control className='ql-picker-label' as="select" onChange={this.props.fontSizeChange} defaultValue={this.props.selectedBase.fontSize}>
                  {fontSize.map((size, idx) => <option value={size} key={idx}>{size}</option>)}
                </Form.Control>
              </div>

            </div>
          </span>
        </div>
      </div >
    );
  }
}


export default CodeEditorToolbar