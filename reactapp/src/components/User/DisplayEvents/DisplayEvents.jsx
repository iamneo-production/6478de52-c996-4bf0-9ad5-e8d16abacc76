import React from 'react';
import './DisplayEvents.css';
import Header from '../../Header/Header';
import Avatar from '@mui/material/Avatar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import EventCard from '../EventCard/EventCard';
import { useStateValue } from '../../../functions/Utils/StateProvider';

function DisplayEvents() {

  const [{userType}] = useStateValue();

  const breadcrumbs = [
    <Typography key="1" color="inherit">
      {userType === 'organizer' ? 'Organizer' : 'User'}
    </Typography>,
    <Typography key="2" color="text.primary">
      Events
    </Typography>
  ];


  return (
    <div>
        <Header/>
        <div className="DisplayEvents-Nav">
          <Avatar sx={{width: 30, height: 30, marginRight: '8px'}}>
            <span className="material-icons">person</span>
          </Avatar>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className="DisplayEvents-CardsContainer">
          <EventCard 
            url={"https://artwork.espncdn.com/events/401354551/16x9/1280x720_20220403181533.jpg"} 
            title={"Arizona Diamondbacks vs. St. Louis Cardinals"}
            date={"Sun, May 15"}
            time={"11.00 AM"}
            type={userType}
          />
          <EventCard 
            url={"https://artwork.espncdn.com/events/400984379/16x9/1280x720_201806201950.jpg"}
            title={"Pittsburgh Pirates vs. Cincinnati Reds"}
            date={"Mon, May 16"}
            time={"3.00 PM"}
            type={userType}
          />
          <EventCard 
            url={"https://artwork.espncdn.com/events/401227292/16x9/1280x720_20210413202655.jpg"}
            title={"Minnesota Twins vs. Oakland Athletics"}
            date={"Tue, May 17"}
            time={"12.00 PM"}
            type={userType}
          />
          <EventCard 
            url={"https://artwork.espncdn.com/events/401228194/16x9/1280x720_20210602202823.jpg"}
            title={"Chicago Cubs vs. Los Angeles Dodgers"}
            date={"Wed, May 18"}
            time={"1.00 PM"}
            type={userType}
          />
          <EventCard 
            url={"https://artwork.espncdn.com/events/401354534/16x9/1280x720_20220406215936.jpg"}
            title={"Seattle Mariners vs. Tampa Bay Rays"}
            date={"Thu, May 19"}
            time={"2.00 PM"}
            type={userType}
          />
          <EventCard 
            url={"https://artwork.espncdn.com/events/401227814/16x9/1280x720_20210519144729.jpg"}
            title={"San Diego Padres vs. Houston Astros"}
            date={"Fri, May 20"}
            time={"9.00 AM"}
            type={userType}
          />
        </div>
    </div>
  )
}

export default DisplayEvents