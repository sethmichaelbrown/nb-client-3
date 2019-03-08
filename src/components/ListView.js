import React from 'react'

const ListView = (props) => {
  // console.log('ListView', props)
  return (
    <div className="ListView">
      <ul className="list-group">

        {props.userBases.length > 0 ?
          props.userBases.map((base, idx) =>

            <a key={idx}  onClick={props.selectedBase}>
              <li id={base.id} className="list-group-item">{base.baseName}</li>
            </a>)
          : ''}


      </ul>
    </div>
  )

}

export default ListView