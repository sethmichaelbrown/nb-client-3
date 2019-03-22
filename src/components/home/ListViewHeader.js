import React from 'react'
import { FormControl } from 'react-bootstrap'

const ListViewHeader = (props) => {
  // console.log('LVH', props)
  return (
    <ul className="list-group">
      <li className="list-group-item list-group-header">
        <div className="row">
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-4 header-text" onClick={props.sortBy}>
                <a id='baseName'>baseName
                  {props.sortByVal[0] === 'baseName' ? props.sortByVal[1] === 'down' ?
                    <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-up"></i> : ''}
                </a>
              </div>
              <div className="col-md-2 header-text" onClick={props.sortBy}>
                <a id='codeLanguage'>Language
                  {props.sortByVal[0] === 'codeLanguage' ? props.sortByVal[1] === 'down' ?
                    <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-up"></i> : ''}
                </a>
              </div>
              <div className="col-md-3 header-text" onClick={props.sortBy}>
                <a id='modifiedAt'>Last Modified
                  {props.sortByVal[0] === 'modifiedAt' ? props.sortByVal[1] === 'down' ?
                    <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-up"></i> : ''}
                </a>
              </div>
              <div className="col-md-2 header-text" onClick={props.sortBy}>
                <a id='createdAt'>Created
                  {props.sortByVal[0] === 'createdAt' ? props.sortByVal[1] === 'down' ?
                    <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-up"></i> : ''}
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-2">
            {props.displaySearchBox ?
              <div className="col-md-12">
                <FormControl type="text" placeholder="Search" className="searchBox" onKeyUp={props.search} onBlur={props.backToIcon} />
              </div>
              :
              <div className="col-md-12">
                <a onClick={props.showSearchBox} className="float-right header-text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </a>
              </div>}
          </div>
        </div>
      </li>
    </ul >
  )
}

export default ListViewHeader