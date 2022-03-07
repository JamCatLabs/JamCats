import React from 'react'

function Queue() {
  
  async function searchSong() {
    console.log(document.cookie)
    // const result = await fetch('https://api.spotify.com/v1/search?')
  }
  
  return (
    <div>
      <input type='search' className='input is-primary' placeholder='Add song'></input>
      <button onClick={searchSong} className='button'>Search</button>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {/* when we add a song it will add a table row here */}


        </tbody>
        </table>
    </div>
  )
}

export default Queue