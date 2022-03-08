import React from 'react'

function Navbar(props) {

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <div className='navbar-item'>
          <h1>JAM CATS</h1>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a href='/login' className="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;