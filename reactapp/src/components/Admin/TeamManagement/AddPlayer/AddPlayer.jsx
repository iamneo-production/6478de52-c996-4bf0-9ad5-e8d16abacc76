import { Avatar, Breadcrumbs, Button,Link,TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./AddPlayer.css";
import Header from '../../../Header/Header';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function Addplayer() {
    const [players, setplayers] = useState({
        playerId: '',
        playerFirstName: '',
        playerLastName: '',
        playerAge: '',
        playerGender: '',
        playerDataarr: []
    });
    
    const onAddplayer = () => {
        if(players.playerFirstName===''||players.playerLastName===''||players.playerAge===''||players.playerGender===''){
            setplayers({...players, showError: true, errorMsg: 'Required fields are missing'})
            setTimeout(() => {
              setplayers({...players, showError: false, errorMsg: '', showSuccess: false})
            }, 3000);
        }else{
        console.log(players);
        var q = {
            playerId: 'id' + Math.random().toString(36).substr(2, 9),
            playerFirstName: players.playerFirstName,
            playerLastName: players.playerLastName,
            playerAge: players.playerAge,
            playerGender: players.playerGender,
           };
        console.log(q);
        var t = localStorage.getItem("player");
        t = t ? JSON.parse(t) : [];
        console.log(t);
        t.push(q);
        localStorage.setItem("player", JSON.stringify(t));
        console.log(JSON.parse(localStorage.getItem("player")));
        setplayers({ playerDataarr: '', playerId: '', playerFirstName: '', playerLastName: '',  playerAge: '', playerGender: ''});
        console.log(players);
        //alert("player Successfully added");
        setplayers({...players, showSuccess: true})
        setTimeout(() => {
            setplayers({
                playerId: '',
                playerFirstName: '',
                playerLastName: '',
                playerAge: '',
                playerGender: '',
                playerDataarr: [],
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
            href="/admin/viewTeam"
        >
            Team
        </Link>,
        <Typography key="3" color="text.primary">
            Add player
        </Typography>
    ];
    return (
        <div>
            <Header highlight={"Users"} />
            <div className="Addplayer-Nav">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Avatar style={{ width: 30, height: 30, marginRight: '8px' }}>
                    <span className="material-icons">person</span>
                </Avatar>{breadcrumbs}
            </Breadcrumbs>
            </div>
            <div className="Addplayer-Form">
            {
              players.showError ? (
                <Alert severity="error" className="Login-Error">
                   <strong>{players.errorMsg}</strong>
                </Alert>
              ) : (

               <div style={{marginBottom:"45px"}}></div>
              )
            }
            {
              players.showSuccess ? (
                <Alert severity="success">
                    <strong>Players Successfully Added</strong></Alert>
              ) : (
                  
               <div style={{marginBottom:"45px"}}></div>
              )
            }
            <TextField type="text" error = {players.showError} className='Addplayer-Input'  id="firstName"  label="Enter the First name"  value={players.playerFirstName}
                    onChange={(e) => { setplayers({ ...players, playerFirstName: e.target.value }); }}  variant="standard" required/>
        
            <TextField type="text" error = {players.showError} className='Addplayer-Input'  id="lastName" label="Enter the Last name"  value={players.playerLastName}
                        onChange={(e) => { setplayers({ ...players, playerLastName: e.target.value }); }}  variant="standard" required/>
            
            <TextField type="text" error = {players.showError} className='Addplayer-Input'  id="age" label="Enter Age"  value={players.playerAge}
                        onChange={(e) => { setplayers({ ...players, playerAge: e.target.value }); }}  variant="standard" required/>
                    
            <TextField type="text" error = {players.showError} className='Addplayer-Input'  id="gender" label="Enter Gender"  value={players.playerGender}
                onChange={(e) => { setplayers({ ...players, playerGender: e.target.value }); }}  variant="standard" required/>

            
                <div className='Addplayer-ButtonWrapper'>
                <Button variant="contained" className="AddVenue-Button" id="addTeam" onClick={() => { onAddplayer(); }}>Add Player</Button>
          </div>
          </div>
        </div>
    )
}
export default Addplayer;