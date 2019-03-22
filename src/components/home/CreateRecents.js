import React from 'react'
import { Link } from 'react-browser-router'

const CreateRecents = (props) => {
  // console.log('CreateRecents', props)

  let recentFour = []
  let uBases = [...props.userBases]
  let fBases = uBases.filter(base => base.deleteVal !== true)
  let sBases = fBases.sort((a, b) => (a.modifiedAt > b.modifiedAt) ? -1 : ((b.modifiedAt > a.modifiedAt) ? 1 : 0))

  for (let i = 0; i < 4; i++) {
    recentFour.push(sBases[i])
  }



  return (
    <div className="CreateRecents">
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <h4>New Base</h4>
        </div>
        <div className="col-md-8 d-md-none d-sm-none d-none d-lg-block">
          <h4>Recent Bases</h4>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <Link to='/editor'>
            <button type="button" onClick={() => props.newBase()} className="btn btn-dark btn new-base-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
            </button>
          </Link>
        </div>

        <div className="col-md-8 d-md-none d-sm-none d-none d-lg-block">
          {recentFour[0] !== undefined &&
            recentFour.map((recent, idx) =>
              <Link to='/editor' key={idx} onClick={() => localStorage.setItem('lastSelectedBase', `${recent.id}`)}>
                <button key={idx} type="button" className="btn btn-outline-dark btn recent-base-btn mr-1">
                  <span className="small-text">{recent.baseName}</span>
                </button>
              </Link>)}
        </div>
      </div>

    </div>
  )
}

export default CreateRecents