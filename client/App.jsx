import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import Navbar from './components/Navbar';

class App extends Component {
  render() {

    return (
      <div>
        <Navbar />
        <div className='content'>
          {/* currently grouping all pages on App component. Will separate with react router */}
          <div className='box' id="main-dashboard">
            <Home/>
          </div>
          <div className='box' id="queue-dashboard">
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