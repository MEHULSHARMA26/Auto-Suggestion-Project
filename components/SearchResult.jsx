import React from 'react'
import "./SearchResult.css"
const SearchResult = ({result}) => {
  return (
    <div className="search_result">{result.name}</div>
  )
}

export default SearchResult