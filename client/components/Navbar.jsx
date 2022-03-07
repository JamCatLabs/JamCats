import React from 'react'

function Navbar(props) {

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <div className='navbar-item'>
          <h1>JAM CATS</h1>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" onClick={getToken} >
              <strong>Sign up</strong>
            </a>
            <a href='/login' class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;