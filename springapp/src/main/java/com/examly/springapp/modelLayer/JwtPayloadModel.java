package com.examly.springapp.modelLayer;

public class JwtPayloadModel {

    private String role;
    private int userID;

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public JwtPayloadModel(String role, int userID) {
        this.role = role;
        this.userID = userID;
    }
}
