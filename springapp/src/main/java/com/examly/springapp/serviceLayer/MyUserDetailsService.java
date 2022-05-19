package com.examly.springapp.serviceLayer;

import java.util.ArrayList;
import java.util.Base64;

import com.examly.springapp.modelLayer.UserModel;
import com.examly.springapp.repositoryLayer.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        
        UserModel userModel = userRepository.findByEmail(userName);
        
        byte[] decodedBytes = Base64.getDecoder().decode(userModel.getPassword());
        String decodedPassword = new String(decodedBytes);

        return new User(userModel.getEmail(),decodedPassword, new ArrayList<>());
    }

}
