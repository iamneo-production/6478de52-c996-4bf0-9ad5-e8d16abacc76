import { Avatar, Breadcrumbs, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './EditVenue.css';
import Header from '../../../Header/Header';
import { useLocation, useParams } from 'react-router-dom';
export default function EditVenue() {
    const stater=useLocation();
    const [state,setState]=useState((stater.state.user));
     const onEditVenue = () => {
        if(window.confirm("Press OK to Change") == true){
        var m = JSON.parse(localStorage.getItem("venue"));
        console.log(m[0].venueId == state.venueId)
        for (var i = 0; i < m.length; i++) {
          if (m[i].venueId == state.venueId) {
           m[i].venueName=state.venueName;
           m[i].venueImageUrl=state.venueImageUrl;
           m[i].venueDescription=state.venueDescription;
           m[i].venueLocation=state.venueLocation;
           m[i].venueCapacity=state.venueCapacity;
          }
        }
        localStorage.setItem("venue",JSON.stringify(m));
        alert("changed");
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
    <div className='outer bg-container'>
    <Header highlight={"Users"} />
    <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Avatar style={{ width: 30, height: 30, marginRight: '8px' }}>
            <span className="material-icons">person</span>
        </Avatar>{breadcrumbs}
    </Breadcrumbs>
    <div className="inner container ">
        <div className="form-group">
            <input type="text" className="form-control" id="venueName" placeholder="Enter Venue name" value={state.venueName}
                onChange={(e) => { setState({ ...state, venueName: e.target.value }); }} required>
            </input>
        </div>
        <br />
        <div className="form-group">
            <input type="text" className="form-control" id="capacityOfVenue" placeholder="Enter the capacity of the venue" value={state.venueCapacity}
                onChange={(e) => { setState({ ...state, venueCapacity: e.target.value }); }} required>
            </input>
        </div>
        <br />
        <div className="form-group">
            <input type="text" className="form-control" id="imageurl" placeholder="Enter the Venue Image Url" value={state.venueImageUrl}
                onChange={(e) => { setState({ ...state, venueImageUrl: e.target.value }); }} required>
            </input>
        </div>
        <br />
        <div className="form-group">
            <input type="text" className="form-control" id="venueLocation" placeholder="Enter Venue Location" value={state.venueLocation}
                onChange={(e) => { setState({ ...state, venueLocation: e.target.value }); }} required></input>
        </div>
        <br />
        <div className="form-group">
            <textarea type="text" className="form-control" id="venueDescription" placeholder="Enter the Venue Description" value={state.venueDescription}
                onChange={(e) => { setState({ ...state, venueDescription: e.target.value }); }} required></textarea>
        </div>
        <br />
        <button type='submit' className="btn btn-primary" id="editVenue" onClick={() => { onEditVenue() }}>Update</button>
    </div>
</div>
  )
}
