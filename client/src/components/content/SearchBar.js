import React from 'react';

 const SearchBar = ({ searchBar}) => {
    return (
        <label id="searchBar" htmlFor="search">search:
            <input id="searchBarInput" type="search" name="search" onChange={searchBar} />
        </label>
    )
}

export default SearchBar