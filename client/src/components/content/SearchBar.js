import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    input: {
      paddingBottom: "30px",
      marginLeft: "2.5rem"
    }
}));


 const SearchBar = ({ searchBar}) => {
    const classes = useStyles();
    return (
        <TextField id="standard-basic" label="Search" variant="standard" onChange={searchBar} className={classes.input}/>
    )
}

export default SearchBar