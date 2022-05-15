package com.examly.springapp.controllerLayer;

import java.util.List;

import javax.transaction.Transactional;

import com.examly.springapp.modelLayer.UserModel;
import com.examly.springapp.serviceLayer.UserServices;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserServices userServices;

    @CrossOrigin
    @GetMapping(value="/user")
    public List<UserModel> getUser(){
        return userServices.getAllUsers();
    } 

    @PostMapping(value="/user/edit/{userId}")
    public void editUser(@RequestBody UserModel user, @PathVariable int userId){
        userServices.editSave(user,userId);
    }

    @Transactional
    @DeleteMapping(value="/user/delete/{userId}")
    public void deleteUser(@PathVariable int userId) {
        userServices.deleteSave(userId);
    }
    
}
