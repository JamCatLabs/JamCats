import React from 'react'

function SearchResults(props) {
  return (
    <div className='dropdown-content'>
      <div className='dropdown-item'>Song: {props.song}</div>
      <div className='dropdown-item'>Artist: {props.artist}</div>
    </div>
  )
}

export default SearchResults