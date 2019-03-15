import React from 'react'
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

const CodeEditorToolbar = (props) => {
  console.log('CodeEditorToolbar', props)

  return (
    <div className="CodeEditorToolbar">
      <div className="ql-toolbar ql-snow">
        <span className='ql-formats'>
          <div className="btn-group">
            <span className='ql-header ql-picker dropdown-toggle' id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Language
            <svg>
                <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
                <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
              </svg>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {modes.map((lang, idx) =>
                  <a onClick={props.languageChange} key={idx} className="dropdown-item">
                    {lang}
                  </a>)}
              </div>
            </span>
          </div>
          <div className="btn-group">
            <span className='ql-header ql-picker dropdown-toggle' id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Themes
            <svg>
                <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
                <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
              </svg>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                {themes.map((theme, idx) =>
                  <a onClick={props.themeChange} key={idx} className="dropdown-item">
                    {theme.split('_').join(' ')}
                  </a>)}
              </div>
            </span>
          </div>
        </span>
      </div>
    </div>
  )
}

export default CodeEditorToolbar