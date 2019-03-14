import React from 'react'

const Greeting = (props) => {

  const langs = props.userBases.map(base => base.codeLanguage)
  const diffLangs = new Set(langs)
  console.log()

  return (
    <div className="Greeting">

      <div class="card my-2">
        <div class="card-body">
          <h5 class="card-title">Hello, {props.username}</h5>
          <p class="card-text">{props.userBases.length} Bases in {diffLangs.size} {diffLangs.size > 1 ? 'Languages' : 'Language'}</p>
          <button type="button" className="btn btn-outline-secondary mr-2">My Account</button>
          <button type="button" className="btn btn-outline-secondary">My Account</button>
        </div>
      </div>
      
      {/* <h3></h3>
      <h6>{</h6>
      <div className="row">
        <div className="col-md-6">
          <button type="button" className="btn btn-outline-secondary">Sign Out</button>
        </div>
        <div className="col-md-6">
          <button type="button" className="btn btn-outline-secondary">My Account</button>
        </div>
      </div> */}
    </div>
  )
}

export default Greeting