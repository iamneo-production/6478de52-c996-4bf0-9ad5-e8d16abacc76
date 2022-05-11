import { Avatar, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';

import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import './EditPlayer.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Header from '../../../Header/Header';
export default function Editplayer() {
    const stater=useLocation();
    const [state,setState]=useState((stater.state.user));
     const onEditplayer = () => {
            if(state.playerId===''||state.playerFirstName===''||state.playerLastName===''||state.playerAge===''||state.playerGender===''){
               
        setState({...state, showError: true, errorMsg: 'Required fields are missing'})
        setTimeout(() => {
          setState({...state, showError: false, errorMsg: '',showSuccess: false})
        }, 3000);
    }
    else{
        //if(window.confirm("Press OK to Change") === true){
            var m = JSON.parse(localStorage.getItem("player"));
    console.log(m[0].playerId === state.playerId)
    for (var i = 0; i < m.length; i++) {
      if (m[i].playerId === state.playerId) {
       m[i].playerFirstName=state.playerFirstName;
       m[i].playerLastName=state.playerLastName;
       m[i].playerAge=state.playerAge;
       m[i].playerGender=state.playerGender;
       
      }
    }
    localStorage.setItem("player",JSON.stringify(m));
    //alert("changed");//}
    setState({...state, showSuccess: true})
    }
      }
      const breadcrumbs = [
        <Typography key="1" color="inherit">
            Admin
        </Typography>,
        <Link
            key="2"
            color="inherit"
            underline="hover"
            href="/admin/viewPlayer"
        >
            Players
        </Link>,
        <Typography key="3" color="text.primary">
            Edit Player
        </Typography>
    ];
  return (
    <div>
        <Header highlight="Users"/>
        <div className="Editplayer-Nav">
          <Avatar sx={{width: 30, height: 30, marginRight: '8px'}}>
            <span className="material-icons">person</span>
          </Avatar>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className="Editplayer-Form">
        {
            state.showError ? (
              <Alert severity="error" className="Login-Error">
                 <strong>{state.errorMsg}</strong>
              </Alert>
            ) : (
              <div style={{marginBottom:"45px"}}></div>
            )
          }
          {
            state.showSuccess ? (
              <Alert severity="success" className="Login-Error">
                 <strong>Successfully Updated</strong>
              </Alert>
            ) : (
              <div style={{marginBottom:"45px"}}></div>
            )
          
          }
        <TextField type="text" className='Editplayer-Input' error = {state.showError}  id="addplayerName"  label="Enter First Name" value={state.playerFirstName}
            onChange={(e) => { setState({ ...state, playerFirstName: e.target.value }); }}  variant="standard" required/>
        
        <TextField type="text" className='Editplayer-Input'  id="addplayerImageUrl" error = {state.showError} label="Enter Last Name" value={state.playerLastName}
            onChange={(e) => { setState({ ...state, playerLastName: e.target.value }); }}  variant="standard" required/>
                    
        <TextField type="text" className='Editplayer-Input'  id="addNoofPlayers" error = {state.showError} label="Enter Age" value={state.playerAge}
            onChange={(e) => { setState({ ...state, playerAge: e.target.value }); }}  variant="standard" required/>
    
        <TextField type="text" className='Editplayer-Input'  id="playerLocation" error = {state.showError} label="Enter Gender" value={state.playerGender}
            onChange={(e) => { setState({ ...state, playerGender: e.target.value }); }}  variant="standard" required/>

          <div className="Editplayer-ButtonWrapper">
          <Button variant="contained" className="Editplayer-Button" id="editplayer" onClick={() => { onEditplayer(); }}>Update</Button>
          </div>
        </div>
    </div>
  )
}
