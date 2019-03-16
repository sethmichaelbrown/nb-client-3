import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'

const ListView = (props) => {
  // console.log('ListView', props)
  return (
    <div className="ListView">
      <ul className="list-group">
        <li className="list-group-item list-group-header">
          <div className="row">
            <div className="col-md-3">
              baseName
          </div>
            <div className="col-md-2">
              Language
          </div>
            <div className="col-md-2">
              Last Modified
          </div>
            <div className="col-md-2">
              Created
          </div>
            <div className="col-md-2">

            </div>
            <div className="col-md-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
            </div>
          </div>

        </li>

        {props.userBases.length > 0 ?
          props.userBases.map((base, idx) =>
            <li className="list-group-item" id={base.id} key={idx}>
              <LinkContainer to='/editor' onClick={(props.selectBaseId)} id={base.id}>
                <div className="row" id={base.id}>

                  <div className="col-md-3" id={base.id}>
                    {base.baseName}
                  </div>
                  <div className="col-md-2" id={base.id}>
                    {base.codeLanguage}
                  </div>
                  <div className="col-md-2" id={base.id}>
                    {moment(base.modifiedAt).calendar()}
                  </div>
                  <div className="col-md-2" id={base.id}>
                    {moment(base.createdAt).format('L')}
                  </div>
                  <div className="col-md-2">
                  </div>

                  <div className="col-md-1">
                    <button type="button" className="btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu pull-left">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                      <div role="separator" className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                  </div>


                </div>
              </LinkContainer>
            </li>
          )
          : ''}


      </ul>
    </div>
  )

}

export default ListView