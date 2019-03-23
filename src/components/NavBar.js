import React from 'react'
import logo from '../media/svgs/text&logo.svg'
import '../styles/navbar.css'

import { Auth } from 'aws-amplify'
import { LinkContainer } from 'react-router-bootstrap'

const NavBar = (props) => {
  // console.log('NavBar', props)

  const signOut = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  return (
    <div className="NavBar">
      <nav className="navbar navbar-expand-*">
        <LinkContainer className="navbar-brand" to='/bases'>
          <img src={logo} alt="noteBase-logo" />
        </LinkContainer>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            
          </ul>
          <button type="button" className="btn btn-outline-light mt-2" onClick={signOut}>Sign Out</button>
        </div>
      </nav>

    </div>
  )

}

export default NavBar