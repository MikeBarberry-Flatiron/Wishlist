import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Auth.css'

import WishlistLogo from '../assets/wishlist_logo.png'

const Register = () => {
    const history = useHistory()

    const [credentials,setCredentials] = useState({
        username: '',
        password: ''
    });
    const [errors,setErrors] = useState('')

    const handleInput = (e)  => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const register = {
            username: credentials.username, 
            password: credentials.password
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
            if (!json.status === 400) {
                history.push("/login")           
            } else {
               setErrors(json.errors[0])
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <>
            <img id="logo" src={WishlistLogo} alt="wishlist-logo"></img>
            <div className="authContainer">
                <h1>Register</h1>
                <form className="authForm" onSubmit={handleSubmit}>
                    <label htmlFor="username">username:
                        <input type="text" name="username" onChange={e => handleInput(e)} value={credentials.username} required /><br />
                    </label>
                    <label htmlFor="password">password:
                        <input type="password" name="password" onChange={e => handleInput(e)} value={credentials.password} required /><br />
                    </label>
                    {errors && 
                        <p class="errorMessage">{errors} </p>
                    }
                    <input type="submit" value="submit"/>
                </form>
                <p>Already Have An Account? <Link to="/login">Log In</Link></p>
            </div>
        </>
    )
}

export default Register;