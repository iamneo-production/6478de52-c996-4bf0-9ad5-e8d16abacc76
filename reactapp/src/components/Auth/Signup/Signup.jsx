import React, { useState } from 'react';
import './Signup.css'
import { useStateValue } from "../../../functions/Utils/StateProvider";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { validateFields, saveUser } from '../../../functions/Auth/Signup';


function Signup() {
  const [state, dispatch] = useStateValue();
  const [values, setValues] = useState({
    type: '',
    email: '',
    username: '',
    mobileno: '',
    password: '',
    cpassword: '',
    errorMsg: '',
    showError: false,
  });
  let navigate = useNavigate();

  const performSignup = () => {
    if(values.email === '' || values.username ==='' || values.mobileno === '' || values.password === '' || values.cpassword === ''){
      setValues({...values, showError: true, errorMsg:"Required Fields Missing"})
      setTimeout(() => {
        setValues({...values, showError: false, errorMsg: ''})
      }, 3000);
    }else{
      const res = validateFields(values)
      if(res.status){
        setValues({...values, showError: true, errorMsg:res.error})
        setTimeout(() => {
          setValues({...values, showError: false, errorMsg: ''})
        }, 3000);
      }else{
        saveUser(values)
        // navigate('/')
      }
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  }

  return (
    <div className="Signin-Container">
      <div className="Signin-Wrapper">
        <div className="Signin-Left">
          <img src="../assets/Signup/landing.png" className="Signin-Image"/>
        </div>
        <div className="Signin-Right">
          <h2 className="Signin-Header">Register</h2>
          {
            values.showError ? (  
              <Alert severity="error" className="Signin-Error">
                Error — <strong>{values.errorMsg}</strong>
              </Alert>
            ) : (
              <div style={{marginBottom:"45px"}}></div>
            )
          }
          {/* <FormControl variant="standard" className="Signin-Input" error = {values.showError}>
            <InputLabel id="admin/user-label">Admin/User *</InputLabel>
            <Select
              labelId="admin/user-label"
              id="admin/user"
              value={values.type}
              label="Admin/User *"
              onChange={handleChange('type')}
            >
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'user'}>User</MenuItem>
            </Select>
          </FormControl> */}
          <TextField
            error = {values.showError}
            id="email"
            type={"email"}
            className="Signin-Input"
            label="Email *"
            value={values.email}
            onChange={handleChange('email')}
            variant="standard"
          />
          <TextField
            error = {values.showError}
            id="username"
            type={"text"}
            className="Signin-Input"
            label="Username *"
            value={values.username}
            onChange={handleChange('username')}
            variant="standard"
          />
          <TextField
            error = {values.showError}
            id="mobileNumber"
            type={"text"}
            className="Signin-Input"
            label="Mobile Number *"
            value={values.mobileno}
            onChange={handleChange('mobileno')}
            variant="standard"
          />
          <TextField
            error = {values.showError}
            id="password"
            type={"password"}
            className="Signin-Input"
            label="Password *"
            value={values.password}
            onChange={handleChange('password')}
            variant="standard"
          />
          <TextField
            error = {values.showError}
            id="confirmPassword"
            type={"password"}
            className="Signin-Input"
            label="Confirm Password *"
            value={values.cpassword}
            onChange={handleChange('cpassword')}
            variant="standard"
          />

          <Button id="submitButton" variant="contained" className="Signin-Button" onClick={() => performSignup()}>Submit</Button>
          <p className="Signin-Text">Already a user? <a id="signupLink" href="/user/login" className="Signin-Link">Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default Signup