package com.examly.springapp.controllerLayer;

import com.examly.springapp.modelLayer.LoginModel;
import com.examly.springapp.modelLayer.UserModel;
import com.examly.springapp.serviceLayer.UserServices;

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

import com.examly.springapp.jwtUtil.JwtUtil;
import com.examly.springapp.modelLayer.AuthenticationResponse;

@RestController
public class AuthController {
    @Autowired
    private UserServices userServices;
    @Autowired
    private UserDetailsService userDetailsService;
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

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
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

    @PostMapping(value="/organizer/signup")
    public boolean addOrganizer(@RequestBody UserModel user){
        if((user.getEmail().equals("organizer")) && (user.getPassword().equals("organizer"))){
            user.setRole("organizer");
            return userServices.saveUser(user);
        }
        return false;
    }
}
