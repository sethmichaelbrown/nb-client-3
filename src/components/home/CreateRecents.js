import React from 'react'
import { Link } from 'react-browser-router'

const CreateRecents = (props) => {
  // console.log(props)

  const sortedBasesMod = props.userBases.sort((a, b) => (a.modifiedAt > b.modifiedAt) ? -1 : ((b.modifiedAt > a.modifiedAt) ? 1 : 0));
  // console.log(sortedBasesMod)

  return (
    <div className="CreateRecents">
      <div className="row">
        <div className="col-md-4">
          <h4>New Base</h4>
        </div>
        <div className="col-md-8">
          <h4>Recent Bases</h4>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <Link to='/editor'>
            <button type="button" onClick={() => props.newBase()} className="btn btn-outline-dark btn new-base-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
            </button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default CreateRecents