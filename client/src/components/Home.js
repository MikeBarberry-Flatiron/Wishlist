import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../store/actions/authActions'
import { getUserContent, deleteContent, likeContent } from '../store/actions/contentActions'

import { UserContent, SearchBar } from './content'
import WishListLogo from '../assets/wishlist_logo.png'

import '../styles/Homepage.css' 
import { makeStyles } from "@material-ui/core/styles";

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
    }, [getUserContent, jwt])

    useEffect(() => {
        const searchContent = userContent.userContent.filter(item  => {
            return item.description.includes(search)
        })
        setSearchResults(searchContent)
    }, [search, userContent.userContent])
    /* constructor() {
        super()
        this.state = {
            jwt: localStorage.getItem('jwt'),
            search: '',
            filterOption: undefined
        }
    }

    componentDidMount() {
        const jwt = { jwt: this.state.jwt}
        this.props.getUserContent(jwt)
    }

    handleLike = (id) => {
        const contentId = { content_id: id }
        this.props.likeContent(contentId)
    }

    handleClick = () => {
        this.props.logoutUser()
    }

    handleDelete = (id) => {
        const request = { 
            content_id: id,
            jwt: this.state.jwt
        }
        this.props.deleteContent(request)
    }
    */ 
    const handleInput = (e)  => {
        setSearch(e.target.value)
    };
    /*

    handleFilter = (e) => {
        this.setState({
            filterOption: e.target.value
        })
    }

    render() {
        const { lifestyleContent, clothingContent, technologyContent, householdContent, newPosts} = this.props.userContent; 
        const searchData = this.props.userContent.userContent?.filter(content => {
            return  content.description.includes(this.state.search) 
        })
        const filter = () => {
            switch (this.state.filterOption) {
                case "lifestyle": return <UserContent  handleDelete={this.handleDelete} content={lifestyleContent} />
                case "clothing": return <UserContent handleDelete={this.handleDelete} content={clothingContent} />
                case "technology": return <UserContent handleDelete={this.handleDelete} content={technologyContent} />
                case "household": return <UserContent handleDelete={this.handleDelete} content={householdContent} />

                default: return <UserContent handleDelete={this.handleDelete} content={searchData} />
            }
        } */

       

        return(
            <div>
               {/*  <h2 id="welcomeMessage">Welcome back, {this.props.currentUser.username}!</h2>
                <button id="logout" onClick={this.handleClick}>logout</button>
                <img id="logo" src={WishListLogo} alt="wishlist-logo"></img>
                <FilterDropdown handleFilter={this.handleFilter} />
                <AddContent />
                <Browse />
                <SlidingImage />
                <NewPosts newPosts={newPosts} handleLike={this.handleLike} />
                {filter()} */}
                <img id="logo" src={WishListLogo} alt="wishlist-logo" className={classes.logoHome}></img>
                <SearchBar searchBar={handleInput} /> 
                <UserContent content={searchResults} searchBar={handleInput} />
            </div>
        )
    // }
}

// don't need to map state to props here because it's getting passed through ProtectedRoute 

export default connect(null, { logoutUser, getUserContent, deleteContent, likeContent })(Home)
