package com.examly.springapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class UserModel {
    @Id
    @Column(name="userId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;
    @Column(name="email")
    private String email;
    @Column(name="password")
    private String password;
    @Column(name="username")
    private String username;
    @Column(name="mobileNumber")
    private String mobileNumber;
    @Column(name="role")
    private String role = "user";

    public UserModel() {
    }

    public UserModel(String email, String username, String mobileNumber, String role) {
        this.email = email;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.role = role;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getMobileNumber() {
        return mobileNumber;
    }
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}