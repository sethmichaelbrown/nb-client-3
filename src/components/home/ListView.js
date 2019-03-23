import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'

const ListView = (props) => {
  // console.log('ListView', props)

  const filteredBases = props.userBases.filter(base =>
    base.baseName.toLowerCase().includes(props.filterString.toLowerCase()) ||
    base.textNote.toLowerCase().includes(props.filterString.toLowerCase()) ||
    base.codeNote.toLowerCase().includes(props.filterString.toLowerCase()) ||
    base.codeLanguage.toLowerCase().includes(props.filterString.toLowerCase())
  )

  return (
    <div className="ListView">
      <ul className="list-group">
        <div className="tester">
          {props.userBases.length > 0 &&
            filteredBases.map((base, idx) =>
              <li className="list-group-item group-item grey-on-hover" id={base.id} key={idx}>
                <div className="row">
                  <LinkContainer to='/editor' onClick={props.selectBaseId} id={base.id}>
                    <div className="col-md-10">
                      <div className="row group-item" id={base.id}>
                        <div className="col-md-4 title-text" id={base.id}>
                          {base.baseName}
                        </div>
                        <div className="col-md-2 second-text" id={base.id}>
                          {base.codeLanguage}
                        </div>
                        <div className="col-md-3 second-text" id={base.id}>
                          {moment(base.modifiedAt).calendar()}
                        </div>
                        <div className="col-md-2 second-text" id={base.id}>
                          {moment(base.createdAt).format('L')}
                        </div>
                      </div>
                    </div>
                  </LinkContainer>
                  <div className="col-md-1">
                    <i className="fa fa-trash" onClick={props.deleteBase} id={base.id}></i>
                  </div>
                </div>
              </li>
            )}
        </div>
      </ul>
    </div>
  )

}

export default ListView