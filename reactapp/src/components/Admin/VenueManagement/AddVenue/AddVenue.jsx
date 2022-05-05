import { Avatar, Breadcrumbs, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
                <button type='submit' className="btn btn-primary" id="addVenue" onClick={() => { onAddVenue(); }}>Add Venue</button>
            </div>
        </div>
    )
}
