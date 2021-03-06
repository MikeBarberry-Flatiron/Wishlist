import React, { Component } from 'react';
import Login from './Login'
import Register from './Register'
import AuthToggle from './AuthToggle'
import WishlistLogo from '../../assets/wishlist_logo.png'
import '../../styles/Auth.css'
import { loginUser } from '../../redux/actions/authActions';
import { connect } from 'react-redux';

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