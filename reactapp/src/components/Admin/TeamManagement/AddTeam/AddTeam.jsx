import { Avatar, Breadcrumbs, Button,Link,TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./AddTeam.css";
import Header from '../../../Header/Header';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function AddTeam() {
    const [teams, setTeams] = useState({
        teamId: '',
        teamName: '',
        teamImageUrl: '',
        teamLocation: '',
        teamCapacity: '',
        teamDescription: '',
        teamDataarr: []
    });
    
    const onAddTeam = () => {
        if(teams.teamName===''||teams.teamCapacity===''||teams.teamImageUrl===''||teams.teamLocation===''||teams.teamDescription===''){
            setTeams({...teams, showError: true, errorMsg: 'Required fields are missing'})
            setTimeout(() => {
              setTeams({...teams, showError: false, errorMsg: '',showSuccess: false})
            }, 3000);
        }else{
        console.log(teams);
        var q = {
            teamId: 'id' + Math.random().toString(36).substr(2, 9),
            teamName: teams.teamName,
            teamImageUrl: teams.teamImageUrl,
            teamLocation: teams.teamLocation,
            teamCapacity: teams.teamCapacity,
            teamDescription: teams.teamDescription,
        };
        console.log(q);
        var t = localStorage.getItem("team");
        t = t ? JSON.parse(t) : [];
        console.log(t);
        t.push(q);
        localStorage.setItem("team", JSON.stringify(t));
        console.log(JSON.parse(localStorage.getItem("team")));
        setTeams({ teamDataarr: '', teamId: '', teamName: '', teamImageUrl: '',  teamLocation: '', teamCapacity: '',teamDescription: '' });
        console.log(teams);
        //alert("Team Successfully added");
        setTeams({...teams,showSuccess: true})
        setTimeout(() => {
            setTeams({
                teamId: '',
                teamName: '',
                teamImageUrl: '',
                teamLocation: '',
                teamCapacity: '',
                teamDescription: '',
                teamDataarr: [],
                showSuccess: false        
            })
          }, 3000);
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
            Add Team
        </Typography>
    ];
    return (
        <div>
            <Header highlight={"Users"} />
            <div className="AddTeam-Nav">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Avatar style={{ width: 30, height: 30, marginRight: '8px' }}>
                    <span className="material-icons">person</span>
                </Avatar>{breadcrumbs}
            </Breadcrumbs>
            </div>
            <div className="AddTeam-Form">
            {
            teams.showError ? (
              <Alert severity="error" className="Login-Error">
                 <strong>{teams.errorMsg}</strong>
              </Alert>
            ) : (
                <div style={{marginBottom:"45px"}}></div>
            )
          }
          {
              teams.showSuccess ? (
                <Alert severity="success">
                    <strong>Teams Successfully Added</strong></Alert>
              ) : (
                  
               <div style={{marginBottom:"45px"}}></div>
              )
            }
          
            <TextField type="text" error = {teams.showError} className='AddTeam-Input'  id="addTeamName"  label="Enter the team name"  value={teams.teamName}
                    onChange={(e) => { setTeams({ ...teams, teamName: e.target.value }); }}  variant="standard" required/>
        
            <TextField type="text" error = {teams.showError} className='AddTeam-Input'  id="addTeamImageUrl" label="Enter Team Image Url"  value={teams.teamImageUrl}
                        onChange={(e) => { setTeams({ ...teams, teamImageUrl: e.target.value }); }}  variant="standard" required/>
            
            <TextField type="text" error = {teams.showError} className='AddTeam-Input'  id="addNoOfPlayers" label="Enter No of Players"  value={teams.teamCapacity}
                        onChange={(e) => { setTeams({ ...teams, teamCapacity: e.target.value }); }}  variant="standard" required/>
                    
            <TextField type="text" error = {teams.showError} className='AddTeam-Input'  id="addTeamLocation" label="Enter Team Location"  value={teams.teamLocation}
                onChange={(e) => { setTeams({ ...teams, teamLocation: e.target.value }); }}  variant="standard" required/>

            <TextField type="text" error = {teams.showError} className='AddTeam-Input'  id="addTeamDescription" label="Enter Team Description"  value={teams.teamDescription}
                onChange={(e) => { setTeams({ ...teams, teamDescription: e.target.value }); }}  variant="standard" required/>

                <div className='AddTeam-ButtonWrapper'>
                <Button variant="contained" className="AddVenue-Button" id="addTeam" onClick={() => { onAddTeam(); }}>Add Team</Button>
          </div>
          </div>
        </div>
    )
}
export default AddTeam;