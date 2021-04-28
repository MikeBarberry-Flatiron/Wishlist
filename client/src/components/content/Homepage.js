import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions'
import { getUserContent, deleteContent, likeContent } from '../../redux/actions/contentActions'
import UserContent from './UserContent'
import AddContent from './AddContent'
import NewPosts from './NewPosts'
import Browse from './Browse'
import FilterDropdown from './FilterDropdown'
import SlidingImage from './SlidingImage'
import WishListLogo from '../../assets/wishlist_logo.png'
import '../../styles/Homepage.css'

class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            jwt: localStorage.getItem('jwt'),
            userContent: [],
            lifestyleContent: [],
            clothingContent: [],
            technologyContent: [],
            householdContent: [],
            newPosts: [],
            filterOption: 'all'
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

    handleFilter = (e) => {
        this.setState({
            filterOption: e.target.value
        })
    }

    render() {
        const { userContent, lifestyleContent, clothingContent, technologyContent, householdContent, newPosts} = this.props.userContent; 
        const filter = () => {
            switch (this.state.filterOption) {
                case "lifestyle": return <UserContent  handleDelete={this.handleDelete} content={lifestyleContent} />
                case "clothing": return <UserContent handleDelete={this.handleDelete} content={clothingContent} />
                case "technology": return <UserContent handleDelete={this.handleDelete} content={technologyContent} />
                case "household": return <UserContent handleDelete={this.handleDelete} content={householdContent} />

                default: return <UserContent handleDelete={this.handleDelete} content={userContent} />
            }
        }
        return(
            <div>
                <h2 id="welcomeMessage">Welcome back, {this.props.currentUser.username}!</h2>
                <button id="logout" onClick={this.handleClick}>logout</button>
                <img id="logo" src={WishListLogo} alt="wishlist-logo"></img>
                <FilterDropdown handleFilter={this.handleFilter} />
                <AddContent />
                <Browse />
                <SlidingImage />
                <NewPosts newPosts={newPosts} handleLike={this.handleLike} />
                {filter()}
            </div>
        )
    }
}

// don't need to map state to props here because it's getting passed through ProtectedRoute 

export default connect(null, { logoutUser, getUserContent, deleteContent, likeContent })(HomePage)