import React, { Component } from 'react'
import NavBar from '../NavBar'
import profile from '../../media/images/portrait_2_copy.png'

const modes = [
  "java",
  "javascript",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "coffee",
  "css",
  "django",
  "haskell",
  "json",
  "pascal",
  "ruby"].sort()

const themes = [
  "ambiance",
  "chaos",
  "clouds",
  "clouds_midnight",
  "cobalt",
  "dawn",
  "dreamweaver",
  "eclipse",
  "github",
  "merbivore",
  "mono_industrial",
  "pastel_on_dark",
  "solarized_dark",
  "solarized_light",
  "tomorrow",
  "tomorrow_night",
  "tomorrow_night_eighties",
  "twilight",
  "vibrant_ink",
  "xcode"
].sort()


const preferences = {
  language: 'java',
  theme: 'vibrant_ink'
}

localStorage.setItem('defaultUserPrefs', JSON.stringify(preferences))

class MyPreferences extends Component {

  state = {

  }


  render() {
    const username = localStorage.getItem('CognitoIdentityServiceProvider.43e59kat93rjn7fsptfkilhnpq.LastAuthUser')
    const defaultPres = JSON.parse(localStorage.getItem('defaultUserPrefs'))

    return (
      <div className="MyPreferences">
        <NavBar />

        <div className="preferences-content">
          <div className="row container">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row container">
                    <div className="col-md-3">
                      <img className='user-photo-preferences' src={profile} alt="user-profile" />
                    </div>
                    <div className="col-md-8 greeting-text">
                      <h5 className="card-title">{username}'s Default Preferences</h5>
                      <p className="card-text">Set these preferences as your default setting when creating a new noteBase.</p>
                      <p className="card-text">These setting can be overridden for specific bases in the editor.</p>
                      <p className="card-text">Base preferences will supercede default preferences.</p>
                    </div>
                  </div>
                </div>

                
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Cras justo odio</li>
                  <li className="list-group-item">Dapibus ac facilisis in</li>
                  <li className="list-group-item">Vestibulum at eros</li>
                </ul>
                <div className="card-body">
                  <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a>
                </div>
              
              
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyPreferences