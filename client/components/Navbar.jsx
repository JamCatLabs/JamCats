import React from 'react'

function Navbar(props) {

  const getToken = async () => {
    const client_id = '205cd69007284821ada5a5f0cad50e05';
    const client_secret = 'ff4e4cb06fa74c9c8199716bb7d86df4';
    const authOptions = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
      
    };
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions)
 
    const data = await response.json();
    return console.log(data);
  }
  

  
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