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
              codeLanguage
          </div>
            <div className="col-md-2">
              Created At
          </div>
            <div className="col-md-3">

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
                    {moment(base.createdAt).calendar()}
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
                  <div className="col-md-1">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"></input>
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