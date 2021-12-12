import React, { Component } from 'react';
import { AuthToggle, Login, Register } from './auth'
import WishlistLogo from '../assets/wishlist_logo.png'
import '../styles/Auth.css'
import { connect } from 'react-redux';
import { loginUser } from '../store/actions/authActions';

class AuthPage extends Component {
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

    handleLogin = (user) => {
        this.props.loginUser(user)
    }

    render() {
        return (
            <div>
                <img id="logo" src={WishlistLogo} alt="wishlist-logo"></img>
                <AuthToggle id={"authButton"} setPage={this.setPage} type={this.state.login} />
                {this.state.login ? <Login handleLogin={this.handleLogin} /> : <Register /> }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser.username
})

export default connect(mapStateToProps, { loginUser })(AuthPage)