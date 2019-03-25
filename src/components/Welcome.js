import React from 'react'
import { Link } from 'react-browser-router'
import logo from '../media/svgs/text&logo.svg'

import '../styles/welcome.css'


const Welcome = (props) => {
  return (
    <div className="Welcome">

      <div className="welcome-layer">
        <div className="welcome-header">
          <img src={logo} height={100} width={400} alt="" />
          <h4>Code & text notes in one</h4>
        </div>

        <div className="welcome-button">
          <Link to='/bases'>
            <button type="button" className="btn btn-dark btn-lg">Get Started</button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Welcome