package com.examly.springapp.controller;

import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.service.UserServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.examly.springapp.jwtutil.JwtUtil;
import com.examly.springapp.model.AuthenticationResponse;
import com.examly.springapp.repository.UserRepository;

@RestController
public class AuthController {
    @Autowired
    private UserServices userServices;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private JwtUtil jwtTokenUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    

    // This function will work for both user and admin
    @PostMapping(value="/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginModel authenticationRequest) throws Exception{
        try{
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        }catch(BadCredentialsException e){
            return ResponseEntity.badRequest().body("Invalid username/password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        UserModel userModel = userRepository.findByEmail(userDetails.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt, userModel.getRole(), userModel.getUserId() ));
    }

    @PostMapping(value="/user/signup")
    public boolean addUser(@RequestBody UserModel user){
        return userServices.saveUser(user);
    }

    @PostMapping(value="/admin/signup")
    public boolean addAdmin(@RequestBody UserModel user){

        final String ADMIN = "admin";

        if((user.getEmail().equals(ADMIN)) && (user.getPassword().equals(ADMIN))){
            user.setRole(ADMIN);
            return userServices.saveUser(user);
        }    
        return false;          
    }

    @PostMapping(value="/organizer/signup")
    public boolean addOrganizer(@RequestBody UserModel user){

        final String ORGANIZER = "organizer";
        if((user.getEmail().equals(ORGANIZER)) && (user.getPassword().equals(ORGANIZER))){
            user.setRole(ORGANIZER);
            return userServices.saveUser(user);
        }
        return false;
    }
}
