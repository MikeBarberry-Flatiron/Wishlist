import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import NotLoggedIn from '../auth/NotLoggedIn';
import UserContent from './UserContent'
import AddContent from './AddContent'
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
            filterOption: 'all'
        }
    }

    componentDidMount() {
        const jwt = { jwt: this.state.jwt}
        axios.post('/index', jwt)
        .then(res => {
            if (res.data.status === 400) {
                window.location = '/notloggedin'
            } else {
                this.setState({
                    userContent: res.data.all_content,
                    lifestyleContent: res.data.lifestyle_content,
                    clothingContent: res.data.clothing_content
                })
            }
        })
    }

    handleClick = () => {
        localStorage.clear()
        window.location = '/login'
    }

    handleDelete = (id) => {
        const contentId = { content_id: id }
        axios.post('/delete', contentId)
        .then(res => {
            console.log(res)
            window.location.reload()
        })
    }

    handleFilter = (e) => {
        this.setState({
            filterOption: e.target.value
        })
    }

    render() {
        const filter = () => {
            switch (this.state.filterOption) {
                case "lifestyle": return <UserContent  handleDelete={this.handleDelete} content={this.state.lifestyleContent} />
                case "clothing": return <UserContent handleDelete={this.handleDelete} content={this.state.clothingContent} />

                default: return <UserContent handleDelete={this.handleDelete} content={this.state.userContent} />
            }
        }
        return(
            <div>
                {this.props.currentUser
                    ? 
                    <div>
                        <h3 id="welcomeMessage">Welcome back, {this.props.currentUser}!</h3>
                        <button id="logout" onClick={this.handleClick}>logout</button>
                        <img id="logo" src={WishListLogo} alt="wishlist-logo"></img>
                        <FilterDropdown handleFilter={this.handleFilter} />
                        <AddContent />
                        <SlidingImage />
                        {filter()}
                    </div>
                    :
                    <NotLoggedIn />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => { 
    return { 
        currentUser: state.currentUser.username,
       
    };
};

export default connect(mapStateToProps)(HomePage)