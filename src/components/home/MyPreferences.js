import React, { Component } from 'react'
import NavBar from '../NavBar'
import profile from '../../media/images/portrait_2_copy.png'
import { Form } from 'react-bootstrap'
import AceEditor from 'react-ace'
import Switch from "react-switch";

import "brace/theme/ambiance";
import "brace/theme/chaos";
import "brace/theme/chrome";
import "brace/theme/clouds";
import "brace/theme/clouds_midnight";
import "brace/theme/cobalt";
import "brace/theme/crimson_editor";
import "brace/theme/dawn";
import "brace/theme/dracula";
import "brace/theme/dreamweaver";
import "brace/theme/eclipse";
import "brace/theme/github";
import "brace/theme/gob";
import "brace/theme/gruvbox";
import "brace/theme/idle_fingers";
import "brace/theme/iplastic";
import "brace/theme/katzenmilch";
import "brace/theme/kr_theme";
import "brace/theme/kuroir";
import "brace/theme/merbivore";
import "brace/theme/merbivore_soft";
import "brace/theme/mono_industrial";
import "brace/theme/pastel_on_dark";
import "brace/theme/solarized_dark";
import "brace/theme/solarized_light";
import "brace/theme/sqlserver";
import "brace/theme/terminal";
import "brace/theme/textmate";
import "brace/theme/tomorrow";
import "brace/theme/tomorrow_night";
import "brace/theme/tomorrow_night_blue";
import "brace/theme/tomorrow_night_bright";
import "brace/theme/tomorrow_night_eighties";
import "brace/theme/twilight";
import "brace/theme/vibrant_ink";
import "brace/theme/xcode";

const modes = [
  "coffee",
  "csharp",
  "css",
  "django",
  "golang",
  "handlebars",
  "haskell",
  "html",
  "java",
  "javascript",
  "json",
  "markdown",
  "mysql",
  "pascal",
  "python",
  "ruby",
  "sass",
  "xml",]

const modeHello = [
  `console.log "Hello, world!"`,
  `Console.WriteLine("Hello, world!");`,
  `.hello-world {
    display: flex;
  }`,
  `print("Hello, world!")`,
  `func main() {
    fmt.Println("Hello, world!")
  }`,
  `<script id="myTemplate" type="text/x-handlebars-template">
        <h1>Hello {{world}}!</h1>
  </script>`,
  `main :: IO ()
  main = putStrLn "Hello, world!"`,
  `<h1>Hello, world!<h1>`,
  `System.out.println("Hello, world!");`,
  `console.log('Hello, world!')`,
  `{ "message":"Hello, world!" }`,
  `<h1>Hello, world!<h1>`,
  `SHOW DATABASES`,
  `begin
    Write('Hello, world!')
  end.`,
  `print(Hello, world!)`,
  `puts 'Hello, world!'`,
  `.hello-world {
    color: $primary-color;
  }`,
  `<heading>Hello, world!</heading>`
]

const themes = [
  'ambiance',
  'chaos',
  'chrome',
  'clouds',
  'clouds_midnight',
  'cobalt',
  'crimson_editor',
  'dawn',
  'dracula',
  'dreamweaver',
  'eclipse',
  'github',
  'gob',
  'gruvbox',
  'idle_fingers',
  'iplastic',
  'katzenmilch',
  'kr_theme',
  'kuroir',
  'merbivore',
  'merbivore_soft',
  'mono_industrial',
  'pastel_on_dark',
  'solarized_dark',
  'solarized_light',
  'sqlserver',
  'terminal',
  'textmate',
  'tomorrow',
  'tomorrow_night',
  'tomorrow_night_blue',
  'tomorrow_night_bright',
  'tomorrow_night_eighties',
  'twilight/vibrant_ink',
  'xcode'].sort()

const fontSize = ['8', '10', '12', '14', '16', '18']

class MyPreferences extends Component {

  state = {
    username: '',
    defaultPrefs: {},
    previewTheme: '',
    previewLang: '',
    previewText: '',
    previewFontSize: '',
    previewLiveAuto: '',
    previewHighlightLine: ''
  }

  componentDidMount() {
    this.preferenceOnLoad()
  }

  preferenceOnLoad = () => {
    const newState = { ...this.state }

    const allPreferences = JSON.parse(localStorage.getItem('defaultUserPrefs'))

    newState.username = localStorage.getItem('CognitoIdentityServiceProvider.43e59kat93rjn7fsptfkilhnpq.LastAuthUser')
    newState.defaultPrefs = allPreferences[newState.username]
    newState.previewTheme = newState.defaultPrefs.theme
    newState.previewLang = newState.defaultPrefs.language
    newState.previewText = newState.defaultPrefs.previewText
    newState.previewLiveAuto = newState.defaultPrefs.liveAutoCompletion
    newState.previewHighlightLine = newState.defaultPrefs.highlightActiveLine
    newState.previewFontSize = newState.defaultPrefs.fontSize


    this.setState({
      username: newState.username,
      defaultPrefs: newState.defaultPrefs,
      previewTheme: newState.previewTheme,
      previewFontSize: newState.previewFontSize,
      previewLiveAuto: newState.previewLiveAuto,
      previewHighlightLine: newState.previewHighlightLine,
      previewText: newState.previewText,
      previewLang: newState.previewLang
    })
  }

  onSave = () => {
    const user = this.state.username
    const preferences = {
      language: this.state.previewLang,
      theme: this.state.previewTheme,
      previewText: this.state.previewText,
      fontSize: this.state.previewFontSize,
      liveAutoCompletion: this.state.previewLiveAuto,
      highlightActiveLine: this.state.previewHighlightLine
    }
    const newPrefs = JSON.parse(localStorage.getItem(`defaultUserPrefs`))
    newPrefs[`${this.state.username}`] = preferences
    localStorage.setItem('defaultUserPrefs', JSON.stringify(newPrefs))
  }

  onCancel = () => {
    this.preferenceOnLoad()
    document.getElementById(`${this.state.defaultPrefs.language}`).selected = true
    document.getElementById(`${this.state.defaultPrefs.theme}`).selected = true
    document.getElementById(`${this.state.defaultPrefs.fontSize}`).selected = true
  }

  previewLangChange = (event) => {
    const idx = modes.indexOf(event.target.value)
    this.setState({
      previewLang: event.target.value,
      previewText: modeHello[idx]
    })
  }

  previewThemeChange = (event) => {
    this.setState({ previewTheme: event.target.value })
  }

  previewFontChange = (event) => {
    this.setState({ previewFontSize: event.target.value })
  }

  previewLiveAutoChange = (value) => {
    this.setState({ previewLiveAuto: value })
  }

  previewHighlightLineChange = (value) => {
    this.setState({ previewHighlightLine: value })
  }


  render() {
    return (
      <div className="MyPreferences">
        <NavBar />

        <div className="preferences-content">
          <div className="row justify-content-center mt-3">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 preferences-card">
                      <img className='user-photo-preferences' src={profile} alt="user-profile" />
                    </div>
                    <div className="col-md-6 greeting-text">
                      <h5 className="card-title">{this.state.username}'s Default Preferences</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <button type="button" className="btn-block btn btn-dark" onClick={this.onSave}>Save</button>
                        </div>
                        <div className="col-md-6">
                          <button type="button" className="btn-block btn btn-outline-secondary" onClick={this.onCancel}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="list-group list-group-flush container">
                  <div className="row">
                    <div className="col-md-6">

                      {this.state.defaultPrefs.language &&
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-7">
                              <p>
                                {this.state.previewLang === this.state.defaultPrefs.language ? 'Current' : 'New'} Default Theme:
                              </p>
                            </div>
                            <div className="col-md-5">
                              <Form.Control className='ql-picker-label' as="select" onChange={this.previewLangChange} defaultValue={this.state.previewLang}>
                                {modes.map((lang, index) => <option value={lang} id={lang} key={index}>{lang}</option>)}
                              </Form.Control>
                            </div>
                          </div>
                        </li>}

                      {this.state.defaultPrefs.theme &&
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-7">
                              <p>
                                {this.state.previewTheme === this.state.defaultPrefs.theme ? 'Current' : 'New'} Default Theme:
                              </p>
                            </div>
                            <div className="col-md-5">
                              <Form.Control className='ql-picker-label' as="select" onChange={this.previewThemeChange} defaultValue={this.state.previewTheme}>
                                {themes.map((theme, idx) => <option value={theme} id={theme} key={idx}>{theme.split('_').join(' ')}</option>)}
                              </Form.Control>
                            </div>
                          </div>
                        </li>}

                      {this.state.defaultPrefs.fontSize &&
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-7">
                              <p>
                                {parseInt(this.state.previewFontSize) === parseInt(this.state.defaultPrefs.fontSize) ? 'Current' : 'New'} Default Font Size:
                                </p>
                            </div>
                            <div className="col-md-5">
                              <Form.Control className='ql-picker-label' as="select" onChange={this.previewFontChange} defaultValue={this.state.previewFontSize}>
                                {fontSize.map((font, idx) => <option value={font} id={font} key={idx}>{font}</option>)}
                              </Form.Control>
                            </div>
                          </div>
                        </li>}

                      {this.state.defaultPrefs &&
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-7">
                              <p>
                                {`Live AutoCompletion ${this.state.previewLiveAuto ? 'Enabled' : 'Disabled'}`}
                              </p>
                            </div>
                            <div className="col-md-2 offset-md-3">
                              <Switch
                                onChange={this.previewLiveAutoChange}
                                checked={this.state.previewLiveAuto}
                                onColor='#5C908F'
                                uncheckedIcon={false}
                                // checkedIcon={false}
                              />
                            </div>
                          </div>
                        </li>}

                      {this.state.defaultPrefs &&
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-7">
                              <p>
                                {`Highlight Active Line ${this.state.previewHighlightLine ? 'Enabled' : 'Disabled'}`}
                              </p>
                            </div>
                            <div className="col-md-2 offset-md-3">
                              <Switch
                                onChange={this.previewHighlightLineChange}
                                checked={this.state.previewHighlightLine}
                                onColor='#5C908F'
                                uncheckedIcon={false}
                                // checkedIcon={false}
                              />
                            </div>
                          </div>
                        </li>}


                    </div >

                    <div className="col-md-6 editor-preview" >
                      <AceEditor
                        fontSize={parseInt(this.state.previewFontSize)}
                        theme={this.state.previewTheme}
                        mode={this.state.previewLang}
                        setOptions={{
                          enableLiveAutocompletion: this.state.previewLiveAuto
                        }}
                        highlightActiveLine={this.state.previewHighlightLine}
                        height='45vh'
                        value={this.state.previewText}
                        editorProps={{ $blockScrolling: true }}
                      />

                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyPreferences

