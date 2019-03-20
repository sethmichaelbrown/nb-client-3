import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { FormControl } from 'react-bootstrap'
import moment from 'moment'

const ListView = (props) => {
  console.log('ListView', props)

  const filteredBases = props.userBases.filter(base =>
    base.baseName.toLowerCase().includes(props.filterString.toLowerCase()) ||
    base.textNote.toLowerCase().includes(props.filterString.toLowerCase()) ||
    base.codeNote.toLowerCase().includes(props.filterString.toLowerCase()) ||
    base.codeLanguage.toLowerCase().includes(props.filterString.toLowerCase())
  )

  return (
    <div className="ListView">
      <ul className="list-group" style={{width: '100vw', height: 'auto', overflow: 'auto'}}>
        <div className="tester">
          {props.userBases.length > 0 ?
            filteredBases.map((base, idx) =>
              <li className="list-group-item group-item" id={base.id} key={idx}>
                <div className="row">
                  <LinkContainer to='/editor' onClick={props.selectBaseId} id={base.id}>
                    <div className="col-md-10">
                      <div className="row group-item" id={base.id}>
                        <div className="col-md-3 item-text" id={base.id}>
                          {base.baseName}
                        </div>
                        <div className="col-md-2 item-text" id={base.id}>
                          {base.codeLanguage}
                        </div>
                        <div className="col-md-2 item-text" id={base.id}>
                          {moment(base.modifiedAt).calendar()}
                        </div>
                        <div className="col-md-1 item-text">
                        </div>
                        <div className="col-md-2 item-text" id={base.id}>
                          {moment(base.createdAt).format('L')}
                        </div>
                        <div className="col-md-1 item-text">
                        </div>
                      </div>
                    </div>
                  </LinkContainer>
                  <div className="col-md-2">
                    <i className="fa fa-trash" onClick={props.deleteBase} id={base.id}></i>
                  </div>
                </div>
              </li>
            ) : ''}
        </div>
      </ul>
    </div>
  )

}

export default ListView