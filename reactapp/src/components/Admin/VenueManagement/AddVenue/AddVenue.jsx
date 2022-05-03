import { Avatar, Breadcrumbs, Link, Typography } from '@mui/material';
import React, { Component } from 'react';
import Header from '../../../Header/Header';

import "./AddVenue.css"
export default class AddVenue extends Component {
  
  state = {
    venueId: '',
    venueName: '',
    venueImageUrl: '',
    venueDescription: '',
    venueLocation: '',
    venueCapacity: '',
    venueDataarr:[],
  }
  breadcrumbs = [
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
  cd(){
    var u=(localStorage.getItem("venue")==null)?JSON.parse(localStorage.getItem("venue")):[];
    console.log(localStorage.getItem("venue")==null,u);
  }
  componentDidMount(){
    var u=JSON.parse(localStorage.getItem("venue"));
    this.setState({venueDataarr:u});
    console.log(u);
  }

  onAddVenue=()=>{
    if(this.state.venueName===''|| this.state.venueImageUrl==='' || this.state.venueDescription===''|| this.state.venueCapacity===''|| this.state.venueLocation==='')
    {
      alert("please fill the required inputs");
    }
    else{
    console.log(this.state);
    var q={
      venueId: 'id' + Math.random().toString(36).substr(2, 9),
      venueName: this.state.venueName,
      venueImageUrl: this.state.venueImageUrl,
      venueDescription: this.state.venueDescription,
      venueLocation: this.state.venueLocation,
      venueCapacity:this.state.venueCapacity,
    };
    console.log(q);
    this.setState({venueDataarr:q,venueId: '',venueName: '',venueImageUrl: '',venueDescription: '',venueLocation: '',venueCapacity: ''},()=>{this.afterupdate()});
  }
  }
  afterupdate()
  { var t=localStorage.getItem("venue");
  console.log(t);
  t=t?JSON.parse(t):[];
  console.log(t);
  t.push(this.state.venueDataarr);
  console.log(t);
    localStorage.setItem("venue",JSON.stringify(t));
    console.log(JSON.parse(localStorage.getItem("venue")));
    this.setState({
      venueId: '',
      venueName: '',
      venueImageUrl: '',
      venueDescription: '',
      venueLocation: '',
      venueCapacity: '',
    })
  }
  render() {
    return (
      <div  className='outer bg-container'>
      <Header highlight={"Users"}/>
      {/* <div className="outer "> */}
        {/* <div className="middle bg-container"> */}
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Avatar style={{ width: 30, height: 30, marginRight: '8px' }}>
              <span className="material-icons">person</span>
            </Avatar>{this.breadcrumbs}
          </Breadcrumbs>
          <div className="inner container ">
              <div className="form-group">
                <input type="text" className="form-control" id="venueName" placeholder="Enter Venue name" value={this.state.venueName}
                  onChange={
                    (e) => {
                      var q = e.target.value;
                      this.setState({ venueName: q })
                    }
                  }
                required></input>
              </div>
              <br/>
              <div className="form-group">
                <input type="text" className="form-control" id="capacityOfVenue" placeholder="Enter the capacity of the venue" value={this.state.venueCapacity}
                onChange={
                  (e) => {
                    var q = e.target.value;
                    this.setState({ venueCapacity: q })
                  }
                }
                required></input>
              </div>
              <br/>
              <div className="form-group">
                <input type="text" className="form-control" id="imageurl" placeholder="Enter the Venue Image Url" value={this.state.venueImageUrl}
                onChange={
                  (e) => {
                    var q = e.target.value;
                    this.setState({ venueImageUrl: q })
                  }
                }
               required ></input>
              </div>
              <br/>
              <div className="form-group">
                <input type="text" className="form-control" id="venueLocation" placeholder="Enter Venue Location"  value={this.state.venueLocation}
                onChange={
                  (e) => {
                    var q = e.target.value;
                    this.setState({ venueLocation: q })
                  }
                }
                required></input>
              </div>
              <br/>
              <div className="form-group">
                <textarea type="text" className="form-control" id="venueDescription" placeholder="Enter the Venue Description" value={this.state.venueDescription}
                onChange={
                  (e) => {
                    var q = e.target.value;
                    this.setState({ venueDescription: q })
                  }
                }
               required ></textarea>
              </div>
              <br/>
              <button type='submit' className="btn btn-primary" id="addVenue" onClick={this.onAddVenue}>Add Venue</button>
          </div>
        </div>
      // </div>
      // </div>
      )
  }
}
