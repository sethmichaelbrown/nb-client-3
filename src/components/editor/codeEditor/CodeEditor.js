import React, { Component } from 'react'
import 'react-quill/dist/quill.snow.css'


import AceEditor from 'react-ace'


import "brace/mode/java"
import "brace/mode/javascript"
import "brace/mode/python"
import "brace/mode/xml"
import "brace/mode/ruby"
import "brace/mode/sass"
import "brace/mode/markdown"
import "brace/mode/mysql"
import "brace/mode/json"
import "brace/mode/html"
import "brace/mode/handlebars"
import "brace/mode/golang"
import "brace/mode/csharp"
import "brace/mode/coffee"
import "brace/mode/css"

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
  "css"]

const themes = [
  "ambiance",
  "chaos",
  "chrome",
  "clouds",
  "clouds_midnight",
  "cobalt",
  "crimson_editor",
  "dawn",
  "dracula",
  "dreamweaver",
  "eclipse",
  "github",
  "gob",
  "gruvbox",
  "idle_fingers",
  "iplastic",
  "katzenmilch",
  "kr_theme",
  "kuroir",
  "merbivore",
  "merbivore_soft",
  "mono_industrial",
  "pastel_on_dark",
  "solarized_dark",
  "solarized_light",
  "sqlserver",
  "terminal",
  "textmate",
  "tomorrow",
  "tomorrow_night",
  "tomorrow_night_blue",
  "tomorrow_night_bright",
  "tomorrow_night_eighties",
  "twilight",
  "vibrant_ink",
  "xcode",
]


const CodeEditor = (props) => {
  console.log("CE Props", props.selectedBase[0])

  return (
    <div className="CodeEditor">
      <div className="ql-toolbar ql-snow">
        <span className='ql-formats'>
          <span className='ql-header ql-picker'>
            Language
          </span>
          <span className='ql-header ql-picker'>
            Theme
          </span>
        </span>
      </div>
      <AceEditor
        mode={props.selectedBase[0] ? props.selectedBase[0].codeLanguage : 'javascript'}
        theme={props.selectedBase[0] ? props.selectedBase[0].theme : 'github'}
        onChange={props.onCodeChange}
        name="UNIQUE_ID_OF_DIV"
        value={props.selectedBase[0] ? props.selectedBase[0].codeNote : ''}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  )
}


export default CodeEditor