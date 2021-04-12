import React, { Component } from 'react';
import Login from './Login'
import Register from './Register'
import AuthToggle from './AuthToggle'
import WishlistLogo from '../../assets/wishlist_logo.png'
import '../../styles/Auth.css'

export default class AuthPage extends Component {
    constructor() {
        super()
        this.state = {
            login: true,
        }
    }

    setPage = () => {
        this.setState(previousState => {
            return {
                login: !previousState.login
            }
        })
    }

    render() {
        return (
            <div>
                < img id="logo" src={WishlistLogo} alt="wishlist-logo"></img>
                <AuthToggle id={"authButton"} setPage={this.setPage} type={this.state.login} />
                {this.state.login ? <Login /> : <Register /> }
            </div>
        )
    }
}