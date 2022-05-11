import { Breadcrumbs, CardActionArea,  IconButton, Rating, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Header from '../../../Header/Header';
import "./ViewTeam.css";
var backuparr = [];
export default function Viewteam() {
    const teamdata = [{
        "teamId": 1,
        "teamName": "MRCC club",
        "teamLocation": "Italy",
        "teamImageUrl": "https://static.timesofisrael.com/www/uploads/2020/01/AP20014523118530.jpg",
        "teamCapacity": 1000,
        "teamDescription":"Awesome Team"
      }, {
        "teamId": 2,
        "teamName": "Acheivers club",
        "teamLocation": "Germany",
        "teamImageUrl": "https://api.time.com/wp-content/uploads/2021/07/israel-baseball-team.jpg?quality=85&crop=1px%2C0px%2C1024px%2C536px&resize=1200%2C628&strip",
        "teamCapacity": 2000,
        "teamDescription":"Super Team"
    }, {
        "teamId": 3,
        "teamName": "Rockers club",
        "teamLocation": "south africa",
        "teamImageUrl": "https://data:image/jpeg;",
        "teamCapacity": 8985,
        "teamDescription":"Crazy Team",
      }, {
        "teamId": 4,
        "teamName": "Lions club",
        "teamLocation": "Derby",
        "teamImageUrl": "https://dw3jhbqsbya58.cloudfront.net/editorial/article/1/a/f/1af2b078-d666-4c4f-baed-757c513e5d00/631e5686-4171-eb11-80ce-a444a33a3a97_original.jpg",
        "teamCapacity": 7136,
        "teamDescription":"Energetic Team"
          }, {
        "teamId": 5,
        "teamName": "Tigers club",
        "teamLocation": "London",
        "teamImageUrl": "https://dw3jhbqsbya58.cloudfront.net/editorial/article/1/a/f/1af2b078-d666-4c4f-baed-757c513e5d00/631e5686-4171-eb11-80ce-a444a33a3a97_original.jpg",
        "teamCapacity": 5860,
        "teamDescription":"Simple Team"
        
      }];
     


    let navigate = useNavigate();

    const [state, setState] = useState({
        search: '',
        teamdataarr: [],
        isModalVisible: false,
        getId: ''
    });
    const [reset, setReset] = useState(false);
    const breadcrumbs = [
        <Typography key="1" color="inherit">
            Admin
        </Typography>,
        <Typography key="2" color="text.primary">
            Teams
        </Typography>
    ];

    const handleViewteam = (user) => {
        navigate("/admin/editteam", { state: { user } })
    }

    useEffect(() => {
        var u = (localStorage.getItem("team") !== null) ? JSON.parse(localStorage.getItem("team")) : [];
        console.log(localStorage.getItem("team") === null, u);
        if (u.length === 0) {
            setState({ ...state, teamdataarr: [] });
            localStorage.setItem("team", JSON.stringify([]));
        }
        else {
            setState({ ...state, teamdataarr: u });
        }
    }, []);
    const deleteteam = (key) => {
        if (window.confirm("Press OK to Delete") === true) {
            var m = JSON.parse(localStorage.getItem("team"));
            var k = m.filter((el) => {
                return !(el.teamId === key);
            })
            console.log(k);
            localStorage.setItem("team", JSON.stringify(k));
            window.location.reload();
        }
    }

    const searchbyname = () => {
        resetdata();
        backuparr = state.teamdataarr;
        console.log(backuparr, "backuparr");
        setReset(true);
        var k = state.teamdataarr;
        console.log(k);
        var q = k.filter((el) => {
            console.log(el.teamName.toLowerCase().includes(state.search.toLowerCase()), el.teamName.toLowerCase(), state.search.toLowerCase())
            return el.teamName.toLowerCase().includes(state.search.toLowerCase())
        })
        console.log(q);
        setState({ ...state, teamdataarr: q });
    }
    const searchbylocation = () => {
        resetdata();
        backuparr = state.teamdataarr;
        console.log(backuparr, "backuparr");
        setReset(true);
        var k = state.teamdataarr;
        var q = k.filter(el => {
            console.log(el.teamLocation.toLowerCase().includes(state.search.toLowerCase()))
            return el.teamLocation.toLowerCase().includes(state.search.toLowerCase())
        })
        setState({ ...state, teamdataarr: q });
    }
    const resetdata = () => {
        setReset(false);
        console.log(backuparr, "hello");
        setState({ ...state, teamdataarr: backuparr });
    }
    const loadsampledata = () => {
        setState({ ...state, teamdataarr: teamdata });
        localStorage.setItem("team", JSON.stringify(teamdata));
    }

    return (
        <div>
            <Header highlight={"Users"} />
                <div className="Viewteam-Nav">
                    <Avatar sx={{ width: 30, height: 30, marginRight: '8px' }}>
                        <span className="material-icons">person</span>
                    </Avatar>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </div>
                <div className='Viewteam-SearchWrapper'>
                <TextField type="text" className='Search-Input'  id="teamName"  label="Enter team name" value={state.teamName}
                        onChange={(e) => { setState({ ...state, teamName: e.target.value }); }}  variant="standard" size="medium" required/>
                <Button variant="contained" className="Viewteam-Button"  onClick={searchbyname} disabled={reset} >Search By team Name</Button>
                <Button variant="contained" className="Viewteam-Button" onClick={searchbylocation} disabled={reset} >Search By  team Location</Button>
                <Button variant="contained" className="Viewteam-Button" onClick={resetdata} disabled={!reset} >Reset</Button>
                </div>

                {(state.teamdataarr.length !== 0) ?
                    (
                        <Grid className="d-flex justify-content-center" container spacing={1}> {state.teamdataarr.map((cards, index) => {
                            return (
                                <Grid item style={{ padding: "20px" }} key={index} id={"adminTeamGrid" + (index + 1)}>
                                    <Card style={{ width: 350, borderRadius: "10px", border: "none" }} hoverable="true">
                                        <CardActionArea style={{ height: 350 }}>
                                            <CardMedia
                                                component="img"
                                                style={{ width: 350, height: 200, objectFit: "contain" }}
                                                image={cards.teamImageUrl}
                                                alt="team Image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {cards.teamName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {"Place : " + cards.teamLocation}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {"Description : " + cards.teamDescription}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <div>
                                                <IconButton aria-label="edit" onClick={() => handleViewteam(cards)} id="editTeam">
                                                    <span className="material-icons">edit</span>
                                                </IconButton>
                                                <IconButton aria-label="delete" color="error" onClick={() => deleteteam(cards.teamId)} id="deleteTeam">
                                                    <span className="material-icons">delete</span>
                                                </IconButton>
                                                <Button href="/admin/addPlayer" variant="contained" id="addPlayer" >Add Players</Button>

                                            </div>
                                            <Rating name="read-only" value={cards.rating} readOnly />

                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        }
                        )}
                        </Grid>) : (<div><div className="d-flex justify-content-center"> <h3>No Data to Display</h3></div><div className="d-flex justify-content-center"><Button variant="contained" onClick={loadsampledata} >Load Sample Data</Button></div></div>)}
                <Button href="/admin/addteam" variant="contained" size={"large"} id="addTeamButton" style={{ position: "fixed", right: "3%", bottom: "5%", width: "75px", height: "75px", borderRadius: "50%" }}><span className="material-icons">add</span></Button>
        </div>
    )
}
