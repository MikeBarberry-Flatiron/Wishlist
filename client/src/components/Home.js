import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions/authActions'
import { getUserContent, deleteContent } from '../store/actions/contentActions'

const Home = (props) => {
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
       <p>Hello</p>
    )
}

// don't need to map state to props here because it's getting passed through ProtectedRoute 

export default connect(null, { logoutUser, getUserContent, deleteContent })(Home)
