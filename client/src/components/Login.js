import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../store/actions/authActions';

import { Box, TextField, Button, Paper, Link as MUILink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Blob from '../assets/blob.png'
import Blob2 from '../assets/blob2.png'

const theme = createTheme({
    typography: {
      fontFamily: 'Raleway'
    }
});

const Login = (props) => {
    const [credentials,setCredentials] = useState({
        username: '',
        password: ''
    });    

    if (props.currentUser) return <Redirect to="/home" />

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
        <Box sx={{width: '100%', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <Paper variant="outlined">
                <img src={Blob2} alt="blob" style={{position: 'absolute', left: 0, bottom: '14vw', width: '25vw'}} />
            </Paper>
            <Paper variant="outlined">
                <img src={Blob} alt="blob" style={{position: 'absolute', right: 0, top: '16vw', width: '25vw'}} />
            </Paper>
            <Box sx={{width: '400px', height: '400px ', backgroundColor: '#a1caf1', display: 'grid', gridTemplateColumns: 'repeat(1, 60%)', justifyContent: 'center', alignItems: 'center', margin: '20px', boxShadow: '10px 5px 5px #92a1cf', paddingTop: "20px", paddingBottom: "10px" }}>
                <TextField
                    required
                    label="Username"
                    defaultValue="Enter your username"
                    value={credentials.username}
                    onChange={handleInput}
                    name="username"
                />
                 <TextField
                    error={!!props.userErrors}
                    required
                    type="password"
                    label="Password"
                    defaultValue="Enter your password"
                    value={credentials.password}
                    onChange={handleInput}
                    name="password"
                    helperText={props.userErrors}
                />
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
                <ThemeProvider theme={theme}>
                    <MUILink href='/register' style={{fontFamily: 'Raleway', fontWeight: 300}}>Don't Have an Account? Register</MUILink>
                </ThemeProvider>
            </Box>
        </Box>
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