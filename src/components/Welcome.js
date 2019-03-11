import React from 'react'
import { Link, } from 'react-browser-router'
// import recording from '../media/video/recording.mov'
import logo from '../media/svgs/text&logo.svg'

import '../styles/welcome.css'


const Welcome = (props) => {
  return (
    <div className="Welcome">
      <div className="welcome-header">
        <img src={logo} height={100} width={400} alt="" />
        <h3>Subheader goes here and is clever</h3>
      </div>



      <div className="welcome-button">
        <Link to='/bases'>
          <button type="button" className="btn btn-outline-light btn-lg">Get Started</button>
        </Link>
      </div>

    </div>




  )
}

export default Welcome