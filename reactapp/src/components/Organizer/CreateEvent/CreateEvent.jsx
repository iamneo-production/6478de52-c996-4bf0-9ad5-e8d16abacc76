import React from 'react';
import './CreateEvent.css';
import Header from '../../Header/Header';
import Avatar from '@mui/material/Avatar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

function CreateEvent() {

  const breadcrumbs = [
    <Typography key="1" color="inherit">
      Organizer
    </Typography>,
    <Typography key="2" color="text.primary">
      Create Event
    </Typography>
  ];

  return (
    <div>
      <Header/>
      <div className="CreateEvent-Nav">
          <Avatar sx={{width: 30, height: 30, marginRight: '8px'}}>
            <span className="material-icons">person</span>
          </Avatar>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
    </div>
  )
}

export default CreateEvent