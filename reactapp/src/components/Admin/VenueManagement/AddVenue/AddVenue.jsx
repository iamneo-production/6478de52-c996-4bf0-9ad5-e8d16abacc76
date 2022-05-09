import { Avatar, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';
import React, {  useState } from 'react';
import "./AddVenue.css";
import Header from '../../../Header/Header';
export default function AddVenue() {
    const [venue, setVenue] = useState({
        venueId: '',
        venueName: '',
        venueImageUrl: '',
        venueDescription: '',
        venueLocation: '',
        venueCapacity: '',
        venueDataarr: []
    });

    const onAddVenue = () => {
        console.log(venue);
        if(venue.venueImageUrl!==''&&venue.venueName!==''&&venue.venueCapacity!==''&&venue.venueDescription!==''&&venue.venueLocation!==''){
        if(window.confirm("Press OK to Add") === true){
        console.log(venue);
        var q = {
            venueId: 'id' + Math.random().toString(36).substr(2, 9),
            venueName: venue.venueName,
            venueImageUrl: venue.venueImageUrl,
            venueDescription: venue.venueDescription,
            venueLocation: venue.venueLocation,
            venueCapacity: venue.venueCapacity,
        };
        console.log(q);
        var t = localStorage.getItem("venue");
        t = t ? JSON.parse(t) : [];
        console.log(t);
        t.push(q);
        localStorage.setItem("venue", JSON.stringify(t));
        console.log(JSON.parse(localStorage.getItem("venue")));
        setVenue({ venueDataarr: '', venueId: '', venueName: '', venueImageUrl: '', venueDescription: '', venueLocation: '', venueCapacity: '' });
        console.log(venue);
    }
}else{
    alert("Please Fill All the Required Fields")
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
            Add Venue
        </Typography>
    ];
    return (
        <div>
        <Header highlight="Users"/>
        <div className="AddVenue-Nav">
          <Avatar sx={{width: 30, height: 30, marginRight: '8px'}}>
            <span className="material-icons">person</span>
          </Avatar>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className="AddVenue-Form">
        <TextField type="text" className='AddVenue-Input'  id="venueName"  label="Enter Venue name" value={venue.venueName}
                        onChange={(e) => { setVenue({ ...venue, venueName: e.target.value }); }}  variant="standard" required/>
            <TextField type="text" className='AddVenue-Input'  id="capacityOfVenue" label="Enter the capacity of the venue" value={venue.venueCapacity}
                        onChange={(e) => { setVenue({ ...venue, venueCapacity: e.target.value }); }}  variant="standard" required/>
                    
                    <TextField type="text" className='AddVenue-Input'  id="imageurl" label="Enter the Venue Image Url" value={venue.venueImageUrl}
                        onChange={(e) => { setVenue({ ...venue, venueImageUrl: e.target.value }); }}  variant="standard" required/>
                    <TextField type="text" className='AddVenue-Input'  id="venueLocation" label="Enter Venue Location" value={venue.venueLocation}
                        onChange={(e) => { setVenue({ ...venue, venueLocation: e.target.value }); }}  variant="standard" required/>

                    <TextField type="text" className='AddVenue-Input' minRows={3} multiline  id="venueDescription" label="Enter the Venue Description" value={venue.venueDescription}
                        onChange={(e) => { setVenue({ ...venue, venueDescription: e.target.value }); }}  variant="standard" required/>
          <div className="AddVenue-ButtonWrapper">
          <Button variant="contained" className="AddVenue-Button" id="addVenue" onClick={onAddVenue}>Add</Button>
          </div>
        </div>
    </div>
    )
}
