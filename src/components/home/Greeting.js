import React from 'react'

const Greeting = (props) => {
  return (
    <div className="Greeting">
      <h3>Hello, {props.username}</h3>
      <h6>{props.userBases.length} Bases in 1 Language</h6>
      <div className="row">
        <div className="col-md-6">
          <button type="button" className="btn btn-outline-secondary">Sign Out</button>
        </div>
        <div className="col-md-6">
          <button type="button" className="btn btn-outline-secondary">My Account</button>
        </div>
      </div>
    </div>
  )
}

export default Greeting