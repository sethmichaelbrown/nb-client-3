import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import '../../../styles/codeEditor.css'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

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

// const CodeEditorToolbar = (props) => {
//   console.log('CodeEditorToolbar', props)

//   return (
//     <div className="CodeEditorToolbar">
//       <div className="ql-toolbar ql-snow">
//         <span className='ql-formats'>

//           <div className="btn-group">
//             <span className='ql-header ql-picker dropdown-toggle' id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               Language
//             <svg>
//                 <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
//                 <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
//               </svg>
//               <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//                 {modes.map((lang, idx) =>
//                   <button onClick={() => console.log('clicked')} key={idx} className="dropdown-item">
//                     {lang}
//                   </button>)}
//               </div>
//             </span>
//           </div>

//           <div className="btn-group">
//             <span className='ql-header ql-picker dropdown-toggle' id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               Themes
//             <svg>
//                 <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
//                 <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
//               </svg>
//               <div onClick={() => console.log('OnChange')} className="dropdown-menu" aria-labelledby="dropdownMenuButton2">

//                 {themes.map((theme, idx) =>
//                   <option onClick={() => { console.log('Working'); props.themeChange() }} key={idx} className="dropdown-item">
//                     {theme.split('_').join(' ')}
//                   </option>)}

//               </div>
//             </span>
//           </div>
//         </span>
//       </div>
//     </div>
//   )
// }

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
    return (
      <div className="CodeEditorToolbar">
        <div className="ql-toolbar ql-snow">
          <span className='ql-formats'>
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control as="select" onChange={this.props.languageChange} defaultValue={this.props.selectedBase[0].codeLanguage}>
                    {modes.map((lang, idx) => <option value={lang} key={idx}>{lang}</option>)}
                  </Form.Control>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control as="select" onChange={this.props.themeChange} defaultValue={this.props.selectedBase[0].theme}>
                    {themes.map((theme, idx) => <option value={theme} key={idx}>{theme}</option>)}
                  </Form.Control>
                </Form.Group>
              </div>

            </div>
          </span>
        </div>
      </div >
    );
  }
}


export default CodeEditorToolbar