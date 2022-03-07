import React from 'react'

function Queue() {
  return (
    <div>
      <input type='search' className='input is-primary' placeholder='Add song'></input>
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