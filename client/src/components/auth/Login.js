import React, { Component } from 'react';
/* import { checkUser } from '../../redux/actions/userActions.js'
import { connect } from 'react-redux'; */

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            errors: ''
        }
    }

    handleInput = (e)  => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const login = {
            username: this.state.username, 
            password: this.state.password
        }
        this.props.handleLogin(login)
    }

    render() {
        return (
            <div className="authContainer">
                <h1>Login</h1>
                <form className="authForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">username:
                        <input type="text" name="username" onChange={e => this.handleInput(e)} value={this.state.username} required /><br />
                    </label>
                    <label htmlFor="password">password:
                        <input type="password" name="password" onChange={e => this.handleInput(e)} value={this.state.password} required /><br />
                    </label>
                    {this.state.errors && 
                        <p class="errorMessage">{this.state.errors} </p>
                    }
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}

/* const mapStateToProps =  state => ({
    currentUser: state.currentUser.user
})

export default connect(mapStateToProps, { checkUser })(Login) */