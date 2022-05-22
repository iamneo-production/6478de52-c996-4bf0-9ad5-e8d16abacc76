package com.examly.springapp.controller;

import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.UserServices;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private UserServices userServices;

    @Autowired
    UserRepository userRepository;

    @PostMapping(value="/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginModel authenticationRequest) throws Exception{
        UserModel userModel = userRepository.findByEmail(authenticationRequest.getEmail());
        return ResponseEntity.ok(userModel);
    }

    @PostMapping(value="/user/signup")
    public boolean addUser(@RequestBody UserModel user){
        return userServices.saveUser(user);
    }

    @PostMapping(value="/admin/signup")
    public boolean addAdmin(@RequestBody UserModel user){
        if((user.getEmail().equals("admin")) && (user.getPassword().equals("admin"))){
            user.setRole("admin");
            return userServices.saveUser(user);
        }
        return false;
    }
}
