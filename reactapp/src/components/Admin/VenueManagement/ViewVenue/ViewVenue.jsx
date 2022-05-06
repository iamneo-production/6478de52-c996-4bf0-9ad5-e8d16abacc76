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
import "./ViewVenue.css";
var backuparr = [];
export default function ViewVenue() {
    const venuedata = [{
        "venueId": 1,
        "venueName": "Schiller, Trantow and Kshlerin stadium",
        "venueLocation": "No Kunda",
        "venueImageUrl": "http://picsum.photos/127/100",
        "venueCapacity": 94726,
        "rating": 4,
        "venueDescription": "Phasellus in felis. Donec semper sapien a libero. Nam dui."
    }, {
        "venueId": 2,
        "venueName": "Williamson Inc stadium",
        "venueLocation": "Belo Oriente",
        "venueImageUrl": "http://picsum.photos/159/100",
        "venueCapacity": 79889,
        "rating": 3,
        "venueDescription": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
    }, {
        "venueId": 3,
        "venueName": "Abshire LLC stadium",
        "venueLocation": "Klevan’",
        "venueImageUrl": "http://picsum.photos/239/100",
        "venueCapacity": 89685,
        "rating": 2,
        "venueDescription": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."
    }, {
        "venueId": 4,
        "venueName": "Quitzon-Jast stadium",
        "venueLocation": "Ganjur",
        "venueImageUrl": "http://picsum.photos/111/100",
        "venueCapacity": 71626,
        "rating": 5,
        "venueDescription": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    }, {
        "venueId": 5,
        "venueName": "Cruickshank-Kiehn stadium",
        "venueLocation": "Hadžići",
        "venueImageUrl": "http://picsum.photos/201/100",
        "venueCapacity": 53860,
        "rating": 1,
        "venueDescription": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
    }, {
        "venueId": 6,
        "venueName": "Bayer-Hoppe stadium",
        "venueLocation": "Filipowice",
        "venueImageUrl": "http://picsum.photos/246/100",
        "venueCapacity": 70784,
        "rating": 4,
        "venueDescription": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."
    }, {
        "venueId": 7,
        "venueName": "Quitzon Group stadium",
        "venueLocation": "Pingle",
        "venueImageUrl": "http://picsum.photos/166/100",
        "venueCapacity": 70352,
        "rating": 2,
        "venueDescription": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."
    }, {
        "venueId": 8,
        "venueName": "Mitchell, Frami and Hartmann stadium",
        "venueLocation": "Khān Neshīn",
        "venueImageUrl": "http://picsum.photos/180/100",
        "venueCapacity": 61977,
        "rating": 3,
        "venueDescription": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    }, {
        "venueId": 9,
        "venueName": "Dooley-Mills stadium",
        "venueLocation": "Cungapmimbo",
        "venueImageUrl": "http://picsum.photos/153/100",
        "venueCapacity": 61334,
        "rating": 5,
        "venueDescription": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."
    }, {
        "venueId": 10,
        "venueName": "Hauck, Abshire and Kiehn stadium",
        "venueLocation": "Barraute",
        "venueImageUrl": "http://picsum.photos/121/100",
        "venueCapacity": 56918,
        "rating": 2,
        "venueDescription": "In congue. Etiam justo. Etiam pretium iaculis justo."
    }];

    let navigate = useNavigate();

    const [state, setState] = useState({
        search: '',
        venuedataarr: [],
        isModalVisible: false,
        getId: ''
    });
    const [reset, setReset] = useState(false);
    const breadcrumbs = [
        <Typography key="1" color="inherit">
            Admin
        </Typography>,
        <Typography key="2" color="text.primary">
            Venues
        </Typography>
    ];

    const handleViewVenue = (user) => {
        navigate("/admin/editVenue", { state: { user } })
    }

    useEffect(() => {
        var u = (localStorage.getItem("venue") !== null) ? JSON.parse(localStorage.getItem("venue")) : [];
        console.log(localStorage.getItem("venue") === null, u);
        if (u.length === 0) {
            setState({ ...state, venuedataarr: [] });
            localStorage.setItem("venue", JSON.stringify([]));
        }
        else {
            setState({ ...state, venuedataarr: u });
        }
    }, []);
    const deleteVenue = (key) => {
        if (window.confirm("Press OK to Delete") === true) {
            var m = JSON.parse(localStorage.getItem("venue"));
            var k = m.filter((el) => {
                return !(el.venueId === key);
            })
            console.log(k);
            localStorage.setItem("venue", JSON.stringify(k));
            window.location.reload();
        }
    }

    const searchbyname = () => {
        resetdata();
        backuparr = state.venuedataarr;
        console.log(backuparr, "backuparr");
        setReset(true);
        var k = state.venuedataarr;
        console.log(k);
        var q = k.filter((el) => {
            console.log(el.venueName.toLowerCase().includes(state.search.toLowerCase()), el.venueName.toLowerCase(), state.search.toLowerCase())
            return el.venueName.toLowerCase().includes(state.search.toLowerCase())
        })
        console.log(q);
        setState({ ...state, venuedataarr: q });
    }
    const searchbylocation = () => {
        resetdata();
        backuparr = state.venuedataarr;
        console.log(backuparr, "backuparr");
        setReset(true);
        var k = state.venuedataarr;
        var q = k.filter(el => {
            console.log(el.venueLocation.toLowerCase().includes(state.search.toLowerCase()))
            return el.venueLocation.toLowerCase().includes(state.search.toLowerCase())
        })
        setState({ ...state, venuedataarr: q });
    }
    const resetdata = () => {
        setReset(false);
        console.log(backuparr, "hello");
        setState({ ...state, venuedataarr: backuparr });
    }
    const loadsampledata = () => {
        setState({ ...state, venuedataarr: venuedata });
        localStorage.setItem("venue", JSON.stringify(venuedata));
    }

    return (
        <div>
            <Header highlight={"Users"} />
                <div className="ViewVenue-Nav">
                    <Avatar sx={{ width: 30, height: 30, marginRight: '8px' }}>
                        <span className="material-icons">person</span>
                    </Avatar>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </div>
                <div className='ViewVenue-SearchWrapper'>
                <TextField type="text" className='Search-Input'  id="venueName"  label="Enter Venue name" value={state.venueName}
                        onChange={(e) => { setState({ ...state, venueName: e.target.value }); }}  variant="standard" size="medium" required/>
                <Button variant="contained" className="ViewVenue-Button"  onClick={searchbyname} disabled={reset} >Search By Venue Name</Button>
                <Button variant="contained" className="ViewVenue-Button" onClick={searchbylocation} disabled={reset} >Search By  Venue Location</Button>
                <Button variant="contained" className="ViewVenue-Button" onClick={resetdata} disabled={!reset} >Reset</Button>
                </div>

                {(state.venuedataarr.length !== 0) ?
                    (
                        <Grid className="d-flex justify-content-center" container spacing={1}> {state.venuedataarr.map((cards, index) => {
                            return (
                                <Grid item style={{ padding: "20px" }} key={index} id={"adminVenueGrid" + (index + 1)}>
                                    <Card style={{ width: 350, borderRadius: "10px", border: "none" }} hoverable="true">
                                        <CardActionArea style={{ height: 350 }}>
                                            <CardMedia
                                                component="img"
                                                style={{ width: 350, height: 200, objectFit: "contain" }}
                                                image={cards.venueImageUrl}
                                                alt="Venue Image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {cards.venueName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {"Place : " + cards.venueLocation}

                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <div>
                                                <IconButton aria-label="edit" onClick={() => handleViewVenue(cards)} id="editVenue">
                                                    <span className="material-icons">edit</span>
                                                </IconButton>
                                                <IconButton aria-label="delete" color="error" onClick={() => deleteVenue(cards.venueId)} id="deleteVenue">
                                                    <span className="material-icons">delete</span>
                                                </IconButton>
                                            </div>
                                            <Rating name="read-only" value={cards.rating} readOnly />

                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        }
                        )}
                        </Grid>) : (<div><div className="d-flex justify-content-center"> <h3>No Data to Display</h3></div><div className="d-flex justify-content-center"><Button variant="contained" onClick={loadsampledata} >Load Sample Data</Button></div></div>)}
                <Button href="/admin/addVenue" variant="contained" size={"large"} id="addVenue" style={{ position: "fixed", right: "3%", bottom: "5%", width: "75px", height: "75px", borderRadius: "50%" }}><span className="material-icons">add</span></Button>
        </div>
    )
}
