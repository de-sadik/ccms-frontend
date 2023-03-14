import { Box, Button, InputAdornment, Paper, TextField, Typography } from "@material-ui/core";
import { Email, VpnKey } from "@material-ui/icons";
import React, { useState } from "react";
import ErrorLabel from "../../components/errorLabel/errorLabel";
import { localStrorageService } from "../../services/localStorageService";
import { userService } from "../../services/userService";
import "./style.css";

const Login = ({history}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState("");
    const loginFunction = (props) => {
        if(!email || email === ""){
            setError('please Enter the username');
            return;
          }
          if(!password || password === ""){
            setError("please Enter the Password");
            return;
          }
          let body = {
            "email": email,
            "password": password
          }
          setError('');
          userService.loginService(body)
          .then((response)=>{
              console.log(response)
              if(response && response.status === 200){
                console.log(response)
                const token = response.data.token_type + " "+response.data.access_token
                localStorage.setItem('access-token',token) 
                history.push("/vendor-page");
                  
              } else {
                if(response.status === 401){
                  setError("User Not Found");
                  return
                }
                if(response.status === 500){
                  setError("Please try after some time");
                  return
                }
            }
          })
          .catch(error)
    }
    const onChangeEvent = (e) => {
        setError('');
        if (e.target.name === "username") {
          setEmail(e.target.value);
        }
        if (e.target.name === "password") {
          setPassword(e.target.value);
        }
    }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
          <Paper elevation={12}>
              <form className="loginFormContainer" autoComplete="off">
                  <Typography color="primary" align="center" variant="h5">
                      Login
                  </Typography>
                  <TextField
                  fullWidth
                  type="email"
                  id="email"
                  label="Username"
                  placeholder= "abc@gmail.com"
                  name="username"
                  value={email}
                  variant="outlined"
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                              <Email/>   
                           </InputAdornment>
                      )
                  }} 
                  onChange={onChangeEvent}
                  />
                  <br/>
                  <TextField
                  fullWidth
                  type="password"
                  id="password"
                  label="password"
                  placeholder= "Password"
                  name="password"
                  value={password}
                  variant="outlined"
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                              <VpnKey/>   
                           </InputAdornment>
                      )
                  }} 
                  onChange={onChangeEvent}
                  />
                  <br/>
                  {error !== "" &&
                    <ErrorLabel error={error}/>
                  }
                  <Button
                  id="login"
                  name="login"
                  variant ="contained"
                  color="primary"
                  onClick={loginFunction} 
                  >
                      Login
                  </Button>
              </form>
          </Paper>
      </Box>
    </>
  );
};

export default Login;
