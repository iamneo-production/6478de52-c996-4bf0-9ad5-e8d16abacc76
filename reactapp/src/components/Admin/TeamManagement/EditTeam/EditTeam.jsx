import { Avatar, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';

import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import './EditTeam.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Header from '../../../Header/Header';
export default function EditTeam() {
    const stater=useLocation();
    const [state,setState]=useState((stater.state.user));
     const onEditTeam = () => {
            if(state.teamId===''||state.teamImageUrl===''||state.teamName===''||state.teamCapacity===''||state.teamDescription===''||state.teamLocation===''){
               
        setState({...state, showError: true, errorMsg: 'Required fields are missing'})
        setTimeout(() => {
          setState({...state, showError: false, errorMsg: '',showSuccess: false})
        }, 3000);
    }
    else{
        //if(window.confirm("Press OK to Change") === true){
            var m = JSON.parse(localStorage.getItem("team"));
    console.log(m[0].teamId === state.teamId)
    for (var i = 0; i < m.length; i++) {
      if (m[i].teamId === state.teamId) {
       m[i].teamName=state.teamName;
       m[i].teamImageUrl=state.teamImageUrl;
       m[i].teamDescription=state.teamDescription;
       m[i].teamLocation=state.teamLocation;
       m[i].teamCapacity=state.teamCapacity;
      }
    }
    localStorage.setItem("team",JSON.stringify(m));
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
            href="/admin/viewteam"
        >
            Teams
        </Link>,
        <Typography key="3" color="text.primary">
            Edit Team
        </Typography>
    ];
  return (
    <div>
        <Header highlight="Users"/>
        <div className="Editteam-Nav">
          <Avatar sx={{width: 30, height: 30, marginRight: '8px'}}>
            <span className="material-icons">person</span>
          </Avatar>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className="Editteam-Form">
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
        <TextField type="text" className='Editteam-Input' error = {state.showError}  id="addTeamName"  label="Enter team name" value={state.teamName}
            onChange={(e) => { setState({ ...state, teamName: e.target.value }); }}  variant="standard" required/>
        
        <TextField type="text" className='Editteam-Input'  id="addTeamImageUrl" error = {state.showError} label="Enter the team Image Url" value={state.teamImageUrl}
            onChange={(e) => { setState({ ...state, teamImageUrl: e.target.value }); }}  variant="standard" required/>
                    
        <TextField type="text" className='Editteam-Input'  id="addNoofPlayers" error = {state.showError} label="Enter No Of Players" value={state.teamCapacity}
            onChange={(e) => { setState({ ...state, teamCapacity: e.target.value }); }}  variant="standard" required/>
    
        <TextField type="text" className='Editteam-Input'  id="teamLocation" error = {state.showError} label="Enter team Location" value={state.teamLocation}
            onChange={(e) => { setState({ ...state, teamLocation: e.target.value }); }}  variant="standard" required/>

        <TextField type="text" className='Editteam-Input' minRows={3} multiline error = {state.showError} id="teamDescription" label="Enter the team Description" value={state.teamDescription}
            onChange={(e) => { setState({ ...state, teamDescription: e.target.value }); }}  variant="standard" required/>
          <div className="Editteam-ButtonWrapper">
          <Button variant="contained" className="Editteam-Button" id="editteam" onClick={() => { onEditTeam(); }}>Update</Button>
          </div>
        </div>
    </div>
  )
}
