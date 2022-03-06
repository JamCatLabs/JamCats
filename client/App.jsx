import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Home from './containers/Home';

class App extends Component {
  render() {

    return (
      <div>
        <nav className='navbar'>
          <div className='navbar-brand'>
            <div className='navbar-item'>
              <h1>JAM CATS</h1>
            </div>
          </div>
          <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
        </nav>
        <div className='content'>
          <div id="main-dashboard">
            {/* 
            button to create a new jam session
            button to logout
            container to hold all of the jam sessions
            cards to hold informatoin about each jam session
             */}
            <Home/>
          </div>
          <div id="queue-dashboard">
            {/* 
            search bar
            queue container
             song card info
            control buttons
            users in session container
            logout button
             */}
          </div>
          <button className='button'>New Button</button>

        </div>
      </div>

    );
  }
}

export default App