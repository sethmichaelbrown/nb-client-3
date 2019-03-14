import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../../../styles/textEditor.css'


const TextEditor = (props) => {
  // console.log('TE', props)

  return (
    <div className="TextEditor">
      <ReactQuill
        value={props.selectedBase[0] ? props.selectedBase[0].textNote : ''}
        onChange={props.onTextChange}
        height={100}
      />
    </div>
  )

}

export default TextEditor