import React from 'react'
import { Redirect } from 'react-browser-router'

const NotFound = (props) => {
  return (
    <div className="NotFound">
      <Redirect to='/bases' />
    </div>
  )
}

export default NotFound