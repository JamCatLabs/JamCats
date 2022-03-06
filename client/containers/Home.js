{/* 
  button to create a new jam session
  button to logout
  container to hold all of the jam sessions
  cards to hold informatoin about each jam session
  */}
import React, { useState } from 'react'

function Home() {
  const [isActive, setIsActive] = useState(false)
  
  return (
    <div>
      <button className='button is-primary'>Create a Jam Session!</button>
      <div className='box'>
        <div className='card'>
          <header className='card-header'>
          <div className='card-header-title is-6'>
            Jam Session 1
            </div>
          </header>
          <div className='card-content'>
            <p className='title'>Current Song</p>
            <p className='subtitle'>Current Artist</p>
            <div className={isActive ? "dropdown is-active" : "dropdown"}>
              <div className="dropdown-trigger">
                <button onClick={() => {setIsActive(!isActive)}} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Dropdown button</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <a href="#" className="dropdown-item">
                    Add Songs
                  </a>
                  <a className="dropdown-item">
                    Change Order
                  </a>
                  <hr className="dropdown-divider"></hr>
                  <a href="#" className="dropdown-item is-active">
                    Delete Jam Session
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
