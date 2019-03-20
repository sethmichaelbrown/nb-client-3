import React from 'react'
import NavBar from './NavBar'
import profile from '../media/images/portrait_2_copy.png'



const Preferences = (props) => {
  return (
    <div className="Preferences">
      <NavBar />
      <div className="row">
        <div className="col-md-12">
          <form>
            <div class="switch">
              <label>
                <input type="checkbox" />
                Wi-Fi
              </label>
            </div>
            <div class="switch">
              <label>
                <input type="checkbox" />
                Bluetooth
              </label>
            </div>
            <div class="switch">
              <label>
                <input type="checkbox" />
                This is disabled
              </label>
            </div>
          </form>


        </div>
      </div>
    </div>
  )
}

export default Preferences