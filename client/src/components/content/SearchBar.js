import React from 'react';
import { TextField } from '@mui/material'

 const SearchBar = ({ searchBar}) => {
    return (
        <TextField id="standard-basic" label="Search" variant="standard" onChange={searchBar} />
    )
}

export default SearchBar