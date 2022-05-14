import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from "react-router-dom";

function EventCard({url, title, date, time, type}) {

  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/user/bookEvent', {state:{url: url, title: title, date: date, time: time}})
  }

  return (
    <Card sx={{ maxWidth: 345, marginTop: 1, marginBottom: 1}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
            <br/>
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {
          type === 'organizer' ? (
            <Button size="small" color="primary" onClick={() => {console.log("Edit Event")}}>
              Edit Event
            </Button>
          ) : (
            <Button size="small" color="primary" onClick={() => {handleClick()}}>
              Book Ticket
            </Button>
          )
        }
      </CardActions>
    </Card>
  )
}

export default EventCard