import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../store/actions/authActions'
import { getUserContent, deleteContent } from '../store/actions/contentActions'

import { UserContent, SearchBar } from './content'
import WishListLogo from '../assets/wishlist_logo.png'

import '../styles/Homepage.css' 
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    logoHome: {
      maxHeight: "100px",
      maxWidth: "60px",
      position: "relative",
      float: "right",
      right: "3rem"
    }
}));

const Home = (props) => {
    const classes = useStyles();

    const jwt = localStorage.getItem("jwt");

    const { getUserContent, userContent } = props

    const [search,setSearch] = useState('')
    const [searchResults,setSearchResults] = useState([])

    useEffect(() => {
        const token = { jwt: jwt }
        getUserContent(token)
    }, [getUserContent, jwt]);

    useEffect(() => {
        const searchContent = userContent.userContent.filter(item  => {
            return item.description.includes(search)
        })
        setSearchResults(searchContent)
    }, [search, userContent.userContent]);

    const handleLogout = () => {
        props.logoutUser()
    };

    const handleDelete = (id) => {
        const request = { 
            content_id: id,
            jwt: jwt
        }
        props.deleteContent(request)
    }
     
    const handleInput = (e)  => {
        setSearch(e.target.value)
    };
    

    return(
        <div>
            <img src={WishListLogo} alt="wishlist-logo" className={classes.logoHome}></img>
            <SearchBar searchBar={handleInput} /> 
            <Button onClick={handleLogout}>Logout</Button>
            <UserContent content={searchResults} searchBar={handleInput} handleDelete={handleDelete}/>
        </div>
    )
}

// don't need to map state to props here because it's getting passed through ProtectedRoute 

export default connect(null, { logoutUser, getUserContent, deleteContent })(Home)
