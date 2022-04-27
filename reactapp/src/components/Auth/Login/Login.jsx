import React, { useState } from 'react';
import './Login.css';
import { useStateValue } from "../../../functions/Utils/StateProvider";
import { actionTypes } from "../../../functions/Utils/Reducer";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { validateUser } from '../../../functions/Auth/Login';
import Alert from '@mui/material/Alert';

function Login() {
  const [state, dispatch] = useStateValue();
  const [values, setValues] = useState({
    username: '',
    password: '',
    errorMsg: '',
    showPassword: false,
    showError: false
  });
  let navigate = useNavigate();

  const performLogin = () => {
    if(values.username === '' || values.password === ''){
      setValues({...values, showError: true, errorMsg: 'Required Fields Missing'})
      setTimeout(() => {
        setValues({...values, showError: false, errorMsg: ''})
      }, 3000);
    }else{
      const res = validateUser(values.username, values.password)
      if(res.status){
        dispatch({
          type: actionTypes.SET_USER,
          user: res.userID,
          userType : res.userType
        });
        res.userType === 'admin' ? navigate('/admin') : navigate('/')
      }else{
        setValues({...values, showError: true, errorMsg: 'Invalid Username/Password'})
        setTimeout(() => {
          setValues({...values, showError: false, errorMsg: ''})
        }, 3000);
      }
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  return (
    <div className="Login-Container">
      <div className="Login-Wrapper">
        <div className="Login-Left">
          <img src="../assets/Login/landing.jpg" className="Login-Image"/>
        </div>
        <div className="Login-Right">
          <h2 className="Login-Header">Login</h2>
          {
            values.showError ? (
              <Alert severity="error" className="Login-Error">
                Error — <strong>{values.errorMsg}</strong>
              </Alert>
            ) : (
              <div style={{marginBottom:"45px"}}></div>
            )
          }
          <TextField
            error = {values.showError}
            id="email"
            className="Login-Input"
            label="Username *"
            value={values.username}
            onChange={handleChange('username')}
            variant="standard"
          />
          <FormControl className="Login-Input" variant="standard">
            <InputLabel id="password-label" htmlFor="password" error = {values.showError}>Password *</InputLabel>
              <Input
                error = {values.showError}
                required
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => {e.preventDefault()}}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
          </FormControl>
          <Button id="loginButton" variant="contained" className="Login-Button" onClick={() => performLogin()}>Login</Button>
          <p className="Login-Text">Don't have an account? <a id="signupLink" href="/user/signup" className="Login-Link">Signup</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login