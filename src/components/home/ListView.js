import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { FormControl } from 'react-bootstrap'
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
        <li className="list-group-item list-group-header">
          <div className="row">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-3 header-text" onClick={props.sortBy}>
                  <a id='baseName'>baseName</a>
                </div>
                <div className="col-md-2 header-text" onClick={props.sortBy}>
                  <a id='codeLanguage'>Language</a>
                </div>
                <div className="col-md-2 header-text" onClick={props.sortBy}>
                  <a id='modifiedAt'>Last Modified</a>
                </div>
                <div className="col-md-1 item-text">
                </div>
                <div className="col-md-2 header-text" onClick={props.sortBy}>
                  <a id='createdAt'>Created</a>
                </div>
              </div>
            </div>

            {/* <div className="col-md-1"></div> */}

            <div className="col-md-2">
              {props.displaySearchBox ?
                <div className="col-md-12">
                  <FormControl type="text" placeholder="Search" className="searchBox" onKeyUp={props.search} onBlur={props.backToIcon} />
                  {/* <input className="form-control" type="search" placeholder="Search" aria-label="Search" onKeyUp={props.search} onBlur={props.backToIcon} /> */}
                </div>
                :
                <div className="col-md-2">
                  <a onClick={props.showSearchBox} className="float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  </a>
                </div>}
            </div>
          </div>

        </li>

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
                  <button
                    id={base.id}
                    type="button"
                    onClick={props.deleteBase}
                    className="btn btn-outline-danger btn-sm">Delete</button>
                </div>
              </div>
            </li>
          )
          : ''}


      </ul>
    </div>
  )

}

export default ListView