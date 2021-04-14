import React, { Component } from 'react';

export default class Register extends Component {
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
        const register = {
            username: this.state.username, 
            password: this.state.password
        }
        fetch('/register', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(register)
          })
        .then(res => res.json())
        .then(json => {            
            if (json.status === 201) {
                window.location = '/homepage'            
            } else {
                this.setState({
                    errors: json.errors[0]
                })
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="authContainer">
                <h1>Register</h1>
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