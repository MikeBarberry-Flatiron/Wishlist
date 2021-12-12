import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loginUser } from '../store/actions/authActions';
import '../styles/Auth.css'

import WishlistLogo from '../assets/wishlist_logo.png'


const Login = (props) => {
    const [credentials,setCredentials] = useState({
        username: '',
        password: ''
    });    

    const handleInput = (e)  => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: credentials.username,
            password: credentials.password
        }
        props.loginUser(user)
    };

    return (
        props.currentUser ?  <Redirect to="/home" /> : (
        <>
        <img id="logo" src={WishlistLogo} alt="wishlist-logo"></img>
        <div className="authContainer">
            <h1>Login</h1>
            <form className="authForm" onSubmit={handleSubmit}>
                <label htmlFor="username">username:
                    <input type="text" name="username" onChange={e => handleInput(e)} value={credentials.username} required /><br />
                </label>
                <label htmlFor="password">password:
                    <input type="password" name="password" onChange={e => handleInput(e)} value={credentials.password} required /><br />
                </label>
                {props.userErrors && 
                    <p class="errorMessage">{props.userErrors} </p>
                }
                <input type="submit" value="submit"/>
            </form>
            <p>Don't Have An Account? <Link to="/register">Register</Link></p>
        </div>
        </>
        )
    );
};

const mapStateToProps = (state) => { 
    return { 
        currentUser: state.currentUser.isAuthenticated,
        userErrors: state.userErrors.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => {
            dispatch(loginUser(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login) 