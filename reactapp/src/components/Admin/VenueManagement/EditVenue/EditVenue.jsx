import React, { Component } from 'react';
import "./EditVenue.css"
export default class EditVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venueId: '',
      venueName: '',
      venueImageUrl: '',
      venueDescription: '',
      venueLocation: '',
      venueCapacity: '',
      venueDataarr: [],
    }
  }
  componentDidMount() {
    var m = JSON.parse(localStorage.getItem("venue"));
    var k;
    console.log(m[0].venueId === this.props.keyId)
    for (var i = 0; i < m.length; i++) {
      if (m[i].venueId === this.props.keyId) {
        k = m[i];
      }
    }
    console.log(k, this.props.keyId);
    this.setState({ 
    venueId: k.venueId,
    venueName: k.venueName,
    venueImageUrl: k.venueImageUrl,
    venueDescription: k.venueDescription,
    venueLocation: k.venueLocation,
    venueCapacity: k.venueCapacity
    });
  }
  componentWillUnmount() {
    var m = JSON.parse(localStorage.getItem("venue"));
    var k;
    console.log(m[0].venueId === this.props.keyId)
    for (var i = 0; i < m.length; i++) {
      if (m[i].venueId === this.props.keyId) {
        k = m[i];
      }
    }
    console.log(k, this.props.keyId);
    this.setState({ 
      venueId: '',
      venueName: '',
      venueImageUrl: '',
      venueDescription: '',
      venueLocation: '',
      venueCapacity: '',
    });
  }
  onEditVenue = () => {
    var m = JSON.parse(localStorage.getItem("venue"));
    console.log(m[0].venueId === this.props.keyId)
    for (var i = 0; i < m.length; i++) {
      if (m[i].venueId === this.state.venueId) {
       m[i].venueName=this.state.venueName;
       m[i].venueImageUrl=this.state.venueImageUrl;
       m[i].venueDescription=this.state.venueDescription;
       m[i].venueLocation=this.state.venueLocation;
       m[i].venueCapacity=this.state.venueCapacity;
      }
    }
    localStorage.setItem("venue",JSON.stringify(m));
    alert("changed");
  }
  render() {
    return (

      <div className="outer">
        <div className="middle">
          {/* <div className="inner container"> */}
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
          <div className="form-group">
            <input type="text" className="form-control" id="venueLocation" placeholder="Enter Venue Location" value={this.state.venueLocation}
              onChange={
                (e) => {
                  var q = e.target.value;
                  this.setState({ venueLocation: q })
                }
              }
              required></input>
          </div>
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
          <button type='submit' className="btn btn-primary" id="editvenue" onClick={this.onEditVenue}>change</button>
        </div>
      </div>
      // </div>
    )
  }
}
