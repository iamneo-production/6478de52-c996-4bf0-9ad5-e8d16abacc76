import { Alert, Avatar, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';
import React, {  useState } from 'react';
import "./AddVenue.css";
import Header from '../../../Header/Header';
import { useNavigate } from 'react-router-dom';
import { addVenue } from '../../../../functions/Admin/VenueManagement/AddVenue';
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
    const [error, setError] = useState({
        errorMsg: '',
        showError: false
      });
    let navigate = useNavigate();
    const onAddVenue = () => {
        console.log(venue);
        if(venue.venueImageUrl!==''&&venue.venueName!==''&&venue.venueCapacity!==''&&venue.venueDescription!==''&&venue.venueLocation!==''){
        if(window.confirm("Press OK to Add") === true){
        console.log(venue);
        addVenue(venue).then((res) => {
            navigate('/admin/viewVenue')
          })
        console.log(venue);
    }
}else{ setError({ ...error, showError: true, errorMsg: "Required Fields Missing" })
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
        {
          error.showError ? (
            <Alert severity="error" className="Signin-Error">
              Error — <strong>{error.errorMsg}</strong>
            </Alert>
          ) : (
            <div style={{ marginBottom: "45px" }}></div>
          )
        }
        <div className="AddVenue-Title">
            <h1>Add Venue Details</h1>
          </div>
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