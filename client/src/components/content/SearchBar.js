import React from 'react';
import { TextField } from '@mui/material';

export default function SearchBar({ searchBar }) {
  return (
    <TextField
      id='standard-basic'
      label='Search'
      variant='standard'
      onChange={searchBar}
    />
  );
}
