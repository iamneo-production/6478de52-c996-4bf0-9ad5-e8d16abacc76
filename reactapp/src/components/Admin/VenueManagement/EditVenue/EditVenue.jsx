import { Alert, Avatar, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './EditVenue.css';
import Header from '../../../Header/Header';
import { editVenue } from '../../../../functions/Admin/VenueManagement/EditVenue';
export default function EditVenue() {
  const stater = useLocation();
  const [venue, setVenue] = useState((stater.state.user));
  const [error, setError] = useState({
    errorMsg: '',
    showError: false
  });
  let navigate = useNavigate();
  const onEditVenue = () => {
    if (venue.venueId !== '' && venue.venueImageUrl !== '' && venue.venueName !== '' && venue.venueCapacity !== '' && venue.venueDescription !== '' && venue.venueLocation !== '') {
      if (window.confirm("Press OK to Change") === true) 
      {
        // var m = JSON.parse(localStorage.getItem("venue"));
        // console.log(m[0].venueId === venue.venueId)
        // for (var i = 0; i < m.length; i++) {
        //   if (m[i].venueId === venue.venueId) {
        //     m[i].venueName = venue.venueName;
        //     m[i].venueImageUrl = venue.venueImageUrl;
        //     m[i].venueDescription = venue.venueDescription;
        //     m[i].venueLocation = venue.venueLocation;
        //     m[i].venueCapacity = venue.venueCapacity;
        //   }
        // }
        // localStorage.setItem("venue", JSON.stringify(m));
        editVenue(venue).then((res) => {
          navigate('/admin/viewVenue');
        })
        // navigate('/admin/viewVenue');
      }
    }
    else {
      setError({ ...error, showError: true, errorMsg: "Required Fields Missing" })
      setTimeout(() => {
        setError({ ...error, showError: false, errorMsg: '' })
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
      onClick={()=>{ navigate("/admin/viewVenue")}}
    >
      Venues
    </Link>,
    <Typography key="3" color="text.primary">
      Edit Venue
    </Typography>
  ];
  return (
    <div>
      <Header highlight="Users" />
      <div className="EditVenue-Nav">
        <Avatar sx={{ width: 30, height: 30, marginRight: '8px' }}>
          <span className="material-icons">person</span>
        </Avatar>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div className="EditVenue-Form">
        {
          error.showError ? (
            <Alert severity="error" className="Signin-Error">
              Error — <strong>{error.errorMsg}</strong>
            </Alert>
          ) : (
            <div style={{ marginBottom: "45px" }}></div>
          )
        }
        <div className="EditVenue-Title">
            <h1>Venue Details</h1>
          </div>
        <TextField error = {error.showError} type="text" className='EditVenue-Input' id="venueName" label="Enter Venue name" value={venue.venueName}
          onChange={(e) => { setVenue({ ...venue, venueName: e.target.value }); }} variant="standard" required />
        <TextField error = {error.showError} type="text" className='EditVenue-Input' id="capacityOfVenue" label="Enter the capacity of the venue" value={venue.venueCapacity}
          onChange={(e) => { setVenue({ ...venue, venueCapacity: e.target.value }); }} variant="standard" required />

        <TextField error = {error.showError} type="text" className='EditVenue-Input' id="imageurl" label="Enter the Venue Image Url" value={venue.venueImageUrl}
          onChange={(e) => { setVenue({ ...venue, venueImageUrl: e.target.value }); }} variant="standard" required />
        <TextField error = {error.showError} type="text" className='EditVenue-Input' id="venueLocation" label="Enter Venue Location" value={venue.venueLocation}
          onChange={(e) => { setVenue({ ...venue, venueLocation: e.target.value }); }} variant="standard" required />

        <TextField error = {error.showError} type="text" className='EditVenue-Input' minRows={3} multiline id="venueDescription" label="Enter the Venue Description" value={venue.venueDescription}
          onChange={(e) => { setVenue({ ...venue, venueDescription: e.target.value }); }} variant="standard" required />
        <div className="EditVenue-ButtonWrapper">
          <Button variant="contained" className="EditVenue-Button" id="editVenue" onClick={() => { onEditVenue(); }}>Update</Button>
        </div>
      </div>
    </div>
  )
}