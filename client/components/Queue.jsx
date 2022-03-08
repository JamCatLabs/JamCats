import React, {useState} from 'react'
import SearchBar from './SearchBar';

function Queue() {
  const [searchString, setSearchString] = useState('')

  async function searchSong(searchString) {
    const result = await fetch('/search', {
      body: new URLSearchParams({
        searchString: searchString
      })
    });
    const data = await JSON.parse(result);
    //sync it up with our redux store and store it in searchResults property
    //iterate through array of items and render those under search bar
  }
  
  return (
    <div>
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