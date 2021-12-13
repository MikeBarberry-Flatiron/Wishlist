import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, TextField, Button, Link as MUILink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    typography: {
      fontFamily: 'Raleway'
    }
});

const Register = () => {
    const history = useHistory()

    const [credentials,setCredentials] = useState({
        username: '',
        password: '',
        password2: ''
    });

    // errors one is a server error - username taken
    const [errors,setErrors] = useState(null)
    const [passErrors,setPassErrors] = useState(null)

    const handleInput = (e)  => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.password2) return setPassErrors('Passwords don\'t match')
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
            if (!json.status === 500) {
                history.push("/login")           
            } else {
               setErrors(json.errors[0])
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <Box sx={{width: '100%', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <Box sx={{ height: '50vw', width: '90vw', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "linear-gradient(270deg, rgba(176, 42, 42, 0.16) 0%,rgba(176, 42, 42, 0.56) 18.45%,rgba(176, 42, 42, 0.8) 49.67%,rgba(176, 42, 42, 0.56) 82.52%,rgba(176, 42, 42, 0.196364) 99.7%,rgba(189, 40, 40, 0) 99.71%,rgba(203, 56, 55, 0) 99.72%,rgba(203, 56, 55, 0.16) 99.73%),url('https://static.npmjs.com/attachments/ck3uwdslwmr4gc9740vqxa800-bg-teams.png')"}}>
                <Box sx={{ height: '80%', width: '40%', backgroundColor: 'white', border: 'solid', borderRadius: '4rem', borderColor: '#a1caf1', borderWidth: '1em', display: 'grid', gridTemplateColumns: 'repeat(1, 60%)', justifyContent: 'center', alignItems: 'center', margin: '20px', paddingTop: "4vw", paddingBottom: "7vw" }}>
                    <TextField
                        error={!!errors}
                        required
                        label="Username"
                        defaultValue="Enter your username"
                        value={credentials.username}
                        onChange={handleInput}
                        name="username"
                        helperText={errors}
                    />
                     <TextField
                        required
                        type="password"
                        label="Password"
                        defaultValue="Enter your password"
                        value={credentials.password}
                        onChange={handleInput}
                        name="password"
                    />
                    <TextField
                        error={!!passErrors}
                        required
                        type="password"
                        label="Repeat Password"
                        defaultValue="Enter your password again"
                        value={credentials.password2}
                        onChange={handleInput}
                        name="password2"
                        helperText={passErrors}
                    />
                    <Button onClick={handleSubmit} variant="contained">Submit</Button>
                    <ThemeProvider theme={theme}>
                        <MUILink href='/login' style={{paddingLeft: '2vw', fontFamily: "Raleway", fontWeight: 300}}>Already Have an Account? Login</MUILink>
                    </ThemeProvider>
                </Box>
            </Box>
        </Box>
    )
}

export default Register;