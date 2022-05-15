package com.examly.springapp.modelLayer;

public class AuthenticationResponse {
    
    private final String jwt;
    private String userRole;
    private int userID;

    public AuthenticationResponse(String jwt, String userRole, int userID) {
        this.jwt = jwt;
        this.userRole = userRole;
        this.userID = userID;
    }

    public String getUserRole() {
        return userRole;
    }

    public int getUserID() {
        return userID;
    }

    public String getJwt() {
        return jwt;
    }

}
