import React, { useState } from 'react';
import './BookEvent.css'
import Header from '../../Header/Header';
import Avatar from '@mui/material/Avatar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { useLocation } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

function BookEvent() {

    const {state} = useLocation();
    const {url, title, date, time} = state;

    
    const breadcrumbs = [
        <Typography key="1" color="inherit">
          User
        </Typography>,
        <Link
          key="2" 
          color="inherit"
          underline="hover"
          href="/user/displayEvents"
        >
          Events
        </Link>,
        <Typography key="3" color="text.primary">
          Book Event
        </Typography>
    ];

    const [values, setValues] = useState({
      errorMsg: '',
      showError: false,
      name: '',
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    }

    const Div = styled('div')(({ theme }) => ({
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    }));

    return (
      <div>
        <Header/>
        <div className="BookEvent-Nav">
          <Avatar sx={{width: 30, height: 30, marginRight: '8px'}}>
            <span className="material-icons">person</span>
          </Avatar>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className="BookEvent-Form">
          <div className="BookEvent-Title">
            <h1>Booking Details</h1>
          </div>
          <Card sx={{ marginTop: 1, marginBottom: 1}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={url}
                alt=""
              />
            </CardActionArea>
            <CardContent>
              <Typography sx={{fontSize:"25px"}} variant="subtitle1" color="text.primary" component="div">
                {title}
              </Typography>
              <div className="BookEvent-Details">
                <span className="material-icons-outlined">calendar_today</span>
                <span>{date}</span>
              </div>
              <div className="BookEvent-Details">
                <span className="material-icons-outlined">access_time</span>
                <span>{time}</span>
              </div>
              <div className="BookEvent-Details">
                <span className="material-icons-outlined">location_on</span>
                <span>Stadium</span>
              </div>
            </CardContent>
          </Card>
          <div className="BookEvent-Input-2">
            <TextField
              type={"text"}
              className="BookEvent-Input"
              label="First Name *"
              value={values.name}
              onChange={handleChange('name')}
              variant="standard"
              />
            <TextField
              type={"text"}
              className="BookEvent-Input"
              label="Last Name *"
              value={values.name}
              onChange={handleChange('name')}
              variant="standard"
            />
          </div>
          <TextField
            type={"text"}
            className="BookEvent-Input"
            label="Name *"
            value={values.name}
            onChange={handleChange('name')}
            variant="standard"
          />
          <TextField
            type={"text"}
            className="BookEvent-Input"
            label="Name *"
            value={values.name}
            onChange={handleChange('name')}
            variant="standard"
          />
          <TextField
            type={"text"}
            className="BookEvent-Input"
            label="Name *"
            value={values.name}
            onChange={handleChange('name')}
            variant="standard"
          />
          <TextField
            type={"text"}
            className="BookEvent-Input"
            label="Name *"
            value={values.name}
            onChange={handleChange('name')}
            variant="standard"
          />
          <div className="BookEvent-ButtonWrapper">
            <Button variant="contained" className="BookEvent-Button" onClick={() => console.log('Booked')}>Book</Button>
          </div>
        </div>
      </div>
    )
}

export default BookEvent