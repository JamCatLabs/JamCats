import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class App extends Component {
  render() {

    return (
      <div>
        <h1>JAM CATS</h1>
        <ul className='header'>
          <li><a href='/'>Home</a></li>
          <li><a href='/jamSessions'>Jam Sessions</a></li>
        </ul>
        <div className='content'>
        <button className='button'>New Button</button>

        </div>
      </div>

    );
  }
}

export default App