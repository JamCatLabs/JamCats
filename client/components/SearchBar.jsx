import React, {useState} from 'react'
import SearchResult from './SearchResult';

function SearchBar() {
  const [searchString, setSearchString] = useState('');
  const [searchList, setSearchList] = useState([{song: 'Hey Ya', artist: 'OutKast'}, {song: 'Dynamite', artist: 'BTS'}])
  const [isSearching, setIsSearching] = useState(false)
  
  async function searchSong(searchString) {
    setIsSearching(!isSearching)
    const result = await fetch('/search', {
      body: new URLSearchParams({
        searchString: searchString
      })
    });
    const data = await JSON.parse(result);
    //sync it up with our redux store and store it in searchResults property
    //iterate through array of items and render those under search bar
  }
  
  const searchResults = searchList.map((element, index) => {
    return (<SearchResult key={`result${index}`} artist={element.artist} song={element.song}/>)
  })

  return (
    <div className={isSearching ? "dropdown is-active" : "dropdown"}>
      <div className='dropdown-trigger is-flex is-full'>
        <input type='search' className='input is-primary' placeholder='Search for your favorite songs' value={searchString} onChange={(e) => {setSearchString(e.target.value)}}></input>
        <button onClick={() => {searchSong(searchString)}} className='button'>Search</button>
      </div>
      <div className='dropdown-menu'>
        {(searchList.length !== 0) ? searchResults : null}
      </div>
    </div>
  )
}

export default SearchBar