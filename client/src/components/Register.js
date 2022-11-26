import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Raleway",
  },
});

const Register = () => {
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState(null);
  const [passErrors, setPassErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.password2)
      return setPassErrors("Passwords don't match");
    setPassErrors(false);
    const register = {
      username: credentials.username,
      password: credentials.password,
    };
    setIsLoading(true);
    const response = await fetch(
      "https://pshgvjl5aa.execute-api.us-west-2.amazonaws.com/production/api/register",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(register),
      }
    );
    const json = await response.json();
    if (response.status === 200) {
      history.push("/login");
    }
    setErrors(json.error);
    setIsLoading(false);
  };

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
      <Box
        sx={{
          zIndex: "auto",
          height: "50vw",
          width: "90vw",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(270deg, rgba(176, 42, 42, 0.16) 0%,rgba(176, 42, 42, 0.56) 18.45%,rgba(176, 42, 42, 0.8) 49.67%,rgba(176, 42, 42, 0.56) 82.52%,rgba(176, 42, 42, 0.196364) 99.7%,rgba(189, 40, 40, 0) 99.71%,rgba(203, 56, 55, 0) 99.72%,rgba(203, 56, 55, 0.16) 99.73%),url('https://static.npmjs.com/attachments/ck3uwdslwmr4gc9740vqxa800-bg-teams.png')",
        }}
      >
        <Box
          sx={{
            zIndex: 1,
            height: "80%",
            width: "40%",
            backgroundColor: "white",
            border: "solid",
            borderRadius: "4rem",
            borderColor: "#a1caf1",
            borderWidth: "1em",
            display: "grid",
            gridTemplateColumns: "repeat(1, 60%)",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
            paddingTop: "4vw",
            paddingBottom: "7vw",
          }}
        >
          <TextField
            error={!!errors}
            required
            label="Username"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={handleInput}
            name="username"
            helperText={errors}
            sx={{
              zIndex: 2,
            }}
          />
          <TextField
            required
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleInput}
            name="password"
            sx={{
              zIndex: 2,
            }}
          />
          <TextField
            error={!!passErrors}
            required
            type="password"
            label="Repeat Password"
            placeholder="Enter your password again"
            value={credentials.password2}
            onChange={handleInput}
            name="password2"
            helperText={passErrors}
            sx={{
              zIndex: 2,
            }}
          />
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={isLoading}
          >
            Submit
          </LoadingButton>
          <ThemeProvider theme={theme}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              style={{
                paddingLeft: "2vw",
                fontFamily: "Raleway",
                fontWeight: 300,
                zIndex: 2,
              }}
            >
              Already Have an Account? <Link to="/login">Login</Link>
            </Typography>
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
