import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { Box, TextField, Paper, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Blob from "../../assets/blob.png";
import Blob2 from "../../assets/blob2.png";

import { loginUser } from "../../store/actions/authActions";

const theme = createTheme({
  typography: {
    fontFamily: "Raleway",
  },
});

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [userError, setUserError] = useState(null);

  const handleInput = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setUserError(null);
    setIsLoading(true);
    const { username, password } = credentials;
    try {
      const [status, json] = await makeRequest(username, password);
      setIsLoading(false);
      if (status !== 200) {
        if (json.errorType === "User") {
          setUserError(json.error);
        } else {
          setPasswordError(json.error);
        }
      }
      props.loginUser(json.jwt);
    } catch (err) {
      console.log(`An error occurred: ${err}`);
    }
  };

  const makeRequest = async (username, password) => {
    try {
      const response = await fetch(
        "https://pshgvjl5aa.execute-api.us-west-2.amazonaws.com/production/api/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const json = await response.json();
      return [response.status, json];
    } catch (err) {
      return new Error("Fetch error");
    }
  };

  if (props.isLoggedIn) return <Redirect to="/home" />;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Paper variant="outlined">
        <img
          src={Blob2}
          alt="blob"
          style={{
            position: "absolute",
            left: 0,
            bottom: "14vw",
            width: "25vw",
          }}
        />
      </Paper>
      <Paper variant="outlined">
        <img
          src={Blob}
          alt="blob"
          style={{ position: "absolute", right: 0, top: "16vw", width: "25vw" }}
        />
      </Paper>
      <Box
        sx={{
          width: "400px",
          height: "400px ",
          backgroundColor: "#a1caf1",
          display: "grid",
          gridTemplateColumns: "repeat(1, 60%)",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
          boxShadow: "10px 5px 5px #92a1cf",
          paddingTop: "20px",
          paddingBottom: "10px",
        }}
      >
        <TextField
          required
          label="Username"
          name="username"
          placeholder="Enter your username"
          value={credentials.username}
          onChange={handleInput}
          error={!!userError}
          helperText={userError}
        />
        <TextField
          required
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleInput}
          error={!!passwordError}
          helperText={passwordError}
        />
        <LoadingButton
          onClick={(e) => handleSubmit(e)}
          variant="contained"
          loading={isLoading}
        >
          Submit
        </LoadingButton>
        <ThemeProvider theme={theme}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            style={{ fontFamily: "Raleway", fontWeight: 300 }}
          >
            Don't Have an Account? <Link to="/register">Register</Link>
          </Typography>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.currentUser.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (token) => {
      dispatch(loginUser(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
