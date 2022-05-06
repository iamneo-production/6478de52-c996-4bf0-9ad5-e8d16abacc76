import { Avatar, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';
import React, {  useState } from 'react';
import "./AddVenue.css";
import Header from '../../../Header/Header';
export default function AddVenue() {
    const [state, setState] = useState({
        venueId: '',
        venueName: '',
        venueImageUrl: '',
        venueDescription: '',
        venueLocation: '',
        venueCapacity: '',
        venueDataarr: []
    });

    const onAddVenue = () => {
        if(state.venueId!==''&&state.venueImageUrl!==''&&state.venueName!==''&&state.venueCapacity!==''&&state.venueDescription!==''&&state.venueLocation!==''){
        if(window.confirm("Press OK to Add") === true){
        console.log(state);
        var q = {
            venueId: 'id' + Math.random().toString(36).substr(2, 9),
            venueName: state.venueName,
            venueImageUrl: state.venueImageUrl,
            venueDescription: state.venueDescription,
            venueLocation: state.venueLocation,
            venueCapacity: state.venueCapacity,
        };
        console.log(q);
        var t = localStorage.getItem("venue");
        t = t ? JSON.parse(t) : [];
        console.log(t);
        t.push(q);
        localStorage.setItem("venue", JSON.stringify(t));
        console.log(JSON.parse(localStorage.getItem("venue")));
        setState({ venueDataarr: '', venueId: '', venueName: '', venueImageUrl: '', venueDescription: '', venueLocation: '', venueCapacity: '' });
        console.log(state);
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
        <TextField type="text" className='AddVenue-Input'  id="venueName"  label="Enter Venue name" value={state.venueName}
                        onChange={(e) => { setState({ ...state, venueName: e.target.value }); }}  variant="standard" required/>
            <TextField type="text" className='AddVenue-Input'  id="capacityOfVenue" label="Enter the capacity of the venue" value={state.venueCapacity}
                        onChange={(e) => { setState({ ...state, venueCapacity: e.target.value }); }}  variant="standard" required/>
                    
                    <TextField type="text" className='AddVenue-Input'  id="imageurl" label="Enter the Venue Image Url" value={state.venueImageUrl}
                        onChange={(e) => { setState({ ...state, venueImageUrl: e.target.value }); }}  variant="standard" required/>
                    <TextField type="text" className='AddVenue-Input'  id="venueLocation" label="Enter Venue Location" value={state.venueLocation}
                        onChange={(e) => { setState({ ...state, venueLocation: e.target.value }); }}  variant="standard" required/>

                    <TextField type="text" className='AddVenue-Input' minRows={3} multiline  id="venueDescription" label="Enter the Venue Description" value={state.venueDescription}
                        onChange={(e) => { setState({ ...state, venueDescription: e.target.value }); }}  variant="standard" required/>
          <div className="AddVenue-ButtonWrapper">
          <Button variant="contained" className="AddVenue-Button" id="addVenue" onClick={() => { onAddVenue(); }}>Add</Button>
          </div>
        </div>
    </div>
    )
}
