{/* 
  button to create a new jam session
  button to logout
  container to hold all of the jam sessions
  cards to hold informatoin about each jam session
  */}
import React from 'react'

function Home() {
  return (
    <div>
      <button className='button is-primary'>Create a Jam Session!</button>
      <div className='box'>
        <div className='card'>
          <header className='card-header'>
          <div className='card-header-title'>
            Jam Session 1
            </div>
          </header>
          <div className='card-content'>
            <p className='title'>Current Song</p>
            <p className='subtitle'>Current Artist</p>
          </div>
        <div className='card'>Jam Session 2</div>
        <div className='card'>Jam Session 3</div>
      </div>
      <div className='dropdown'>
            <div className='dropdown-trigger'>
              <button className='button'  aria-haspopup="true" aria-controls="dropdown-menu">
                <span>Dropdown button</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className='dropdown-menu'  id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <div className='dropdown-item'>Add</div>
              <div className='dropdown-item'>Delete</div>
              <div className='dropdown-item'>Invite</div>
            </div>
            </div>
          </div>
          <div className="dropdown is-active">
  <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Dropdown button</span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu" role="menu">
    <div className="dropdown-content">
      <a href="#" className="dropdown-item">
        Dropdown item
      </a>
      <a className="dropdown-item">
        Other dropdown item
      </a>
      <a href="#" className="dropdown-item is-active">
        Active dropdown item
      </a>
      <a href="#" className="dropdown-item">
        Other dropdown item
      </a>
      <hr className="dropdown-divider"></hr>
      <a href="#" className="dropdown-item">
        With a divider
      </a>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

export default Home
