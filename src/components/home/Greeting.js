import React from 'react'
import profile from '../../media/images/portrait_2_copy.png'
import { Link } from 'react-browser-router'

const Greeting = (props) => {

  const langs = props.userBases.map(base => base.codeLanguage)
  const diffLangs = new Set(langs)

  return (
    <div className="Greeting">
      <div className="card my-2">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <Link to='/preferences'>
                <img className='user-photo' src={profile} alt="user-profile" />
              </Link>
            </div>
            <div className="col-md-8 greeting-text">
              <h5 className="card-title">Hello, {props.username}</h5>
              <p className="card-text d-md-none d-sm-none d-none d-lg-block">
                {props.userBases.length} Bases in {diffLangs.size} {diffLangs.size > 1 ? 'Languages' : 'Language'}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-md-none d-sm-none d-none d-lg-block">
              <Link to='/preferences'>
                <button type="button" className="btn btn-block btn-outline-dark mt-1">My Preferences</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Greeting