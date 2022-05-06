import { Avatar, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';

import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import './EditVenue.css';
import Header from '../../../Header/Header';
export default function EditVenue() {
    const stater=useLocation();
    const [state,setState]=useState((stater.state.user));
     const onEditVenue = () => {
            if(state.venueId!==''&&state.venueImageUrl!==''&&state.venueName!==''&&state.venueCapacity!==''&&state.venueDescription!==''&&state.venueLocation!==''){
                if(window.confirm("Press OK to Change") === true){
                var m = JSON.parse(localStorage.getItem("venue"));
        console.log(m[0].venueId === state.venueId)
        for (var i = 0; i < m.length; i++) {
          if (m[i].venueId === state.venueId) {
           m[i].venueName=state.venueName;
           m[i].venueImageUrl=state.venueImageUrl;
           m[i].venueDescription=state.venueDescription;
           m[i].venueLocation=state.venueLocation;
           m[i].venueCapacity=state.venueCapacity;
          }
        }
        localStorage.setItem("venue",JSON.stringify(m));
        alert("changed");} 
    }
    else{
        alert("Please Fill All the Required fields");
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
            href="/admin/viewVenue"
        >
            Venues
        </Link>,
        <Typography key="3" color="text.primary">
            Edit Venue
        </Typography>
    ];
  return (
    <div>
        <Header highlight="Users"/>
        <div className="EditVenue-Nav">
          <Avatar sx={{width: 30, height: 30, marginRight: '8px'}}>
            <span className="material-icons">person</span>
          </Avatar>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className="EditVenue-Form">
        <TextField type="text" className='EditVenue-Input'  id="venueName"  label="Enter Venue name" value={state.venueName}
                        onChange={(e) => { setState({ ...state, venueName: e.target.value }); }}  variant="standard" required/>
            <TextField type="text" className='EditVenue-Input'  id="capacityOfVenue" label="Enter the capacity of the venue" value={state.venueCapacity}
                        onChange={(e) => { setState({ ...state, venueCapacity: e.target.value }); }}  variant="standard" required/>
                    
                    <TextField type="text" className='EditVenue-Input'  id="imageurl" label="Enter the Venue Image Url" value={state.venueImageUrl}
                        onChange={(e) => { setState({ ...state, venueImageUrl: e.target.value }); }}  variant="standard" required/>
                    <TextField type="text" className='EditVenue-Input'  id="venueLocation" label="Enter Venue Location" value={state.venueLocation}
                        onChange={(e) => { setState({ ...state, venueLocation: e.target.value }); }}  variant="standard" required/>

                    <TextField type="text" className='EditVenue-Input' minRows={3} multiline  id="venueDescription" label="Enter the Venue Description" value={state.venueDescription}
                        onChange={(e) => { setState({ ...state, venueDescription: e.target.value }); }}  variant="standard" required/>
          <div className="EditVenue-ButtonWrapper">
          <Button variant="contained" className="EditVenue-Button" id="editVenue" onClick={() => { onEditVenue(); }}>Update</Button>
          </div>
        </div>
    </div>
  )
}
