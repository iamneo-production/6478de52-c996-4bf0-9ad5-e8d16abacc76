package com.examly.springapp.service;


import lombok.Data;

@Data
public class VenueDto {
	private int venueId;
	private String venueName;
	private String venueImageUrl;
	private String venueDescription;
	private String venueLocation;
	private int venueCapacity;
	public int getVenueId() {
		return venueId;
	}
	public void setVenueId(int venueId) {
		this.venueId = venueId;
	}
	public String getVenueName() {
		return venueName;
	}
	public void setVenueName(String venueName) {
		this.venueName = venueName;
	}
	public String getVenueImageUrl() {
		return venueImageUrl;
	}
	public void setVenueImageUrl(String venueImageUrl) {
		this.venueImageUrl = venueImageUrl;
	}
	public String getVenueDescription() {
		return venueDescription;
	}
	public void setVenueDescription(String venueDescription) {
		this.venueDescription = venueDescription;
	}
	public String getVenueLocation() {
		return venueLocation;
	}
	public void setVenueLocation(String venueLocation) {
		this.venueLocation = venueLocation;
	}
	public int getVenueCapacity() {
		return venueCapacity;
	}
	public void setVenueCapacity(int venueCapacity) {
		this.venueCapacity = venueCapacity;
	}
}