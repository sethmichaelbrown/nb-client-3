import React from 'react'
import 'react-quill/dist/quill.snow.css'
import '../../../styles/codeEditor.css'


import AceEditor from 'react-ace'
import CodeEditorToolbar from './CodeEditorToolbar'


import "brace/mode/java"
import "brace/mode/django"
import "brace/mode/haskell"
import "brace/mode/javascript"
import "brace/mode/json"
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
import "brace/mode/pascal"
import "brace/mode/ruby"

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

import 'brace/ext/searchbox'



const CodeEditor = (props) => {
  console.log('CodeEditor', props)

  const fontSizeInt = parseInt(props.fontSize)

  return (
    <div className="CodeEditor">
      {props.selectedBase.baseName ?
        <div className="codeEditor-block">
          
          <CodeEditorToolbar
            themeChange={props.themeChange}
            languageChange={props.languageChange}
            fontSizeChange={props.fontSizeChange}
            selectedBase={props.selectedBase} />

          <AceEditor
            fontSize={fontSizeInt}
            mode={props.language ? props.language : 'javascript'}
            theme={props.theme ? props.theme : 'github'}
            onChange={props.onCodeChange}
            defaultValue={props.code}
            value={props.code}
            name="editor-block"
            editorProps={{ $blockScrolling: true }}
            width={''}/>
            
        </div>
        : ''}
    </div >
  )
}


export default CodeEditor