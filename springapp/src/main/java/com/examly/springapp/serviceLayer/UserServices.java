package com.examly.springapp.serviceLayer;

import java.util.Base64;
import java.util.List;

import com.examly.springapp.modelLayer.LoginModel;
import com.examly.springapp.modelLayer.UserModel;
import com.examly.springapp.repositoryLayer.LoginRepository;
import com.examly.springapp.repositoryLayer.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginRepository loginRepository;

    public boolean saveUser(UserModel user){
        String email = user.getEmail();
        String password = user.getPassword();
        String encodedString = Base64.getEncoder().encodeToString(password.getBytes());
        user.setPassword(encodedString);
		String username = user.getUsername();
			if(!userRepository.existsByEmail(email) && !userRepository.existsByUsername(username)){
				userRepository.save(user);
                LoginModel login = new LoginModel(email,password);
				loginRepository.save(login);
				return true;
			}
			return false;	
	}

    public List<UserModel> getAllUsers() {
        return (List<UserModel>) userRepository.findAll();
    }

    public void editSave(UserModel user, int userId) {
        UserModel um = userRepository.findByUserId(userId);
        um.setEmail(user.getEmail());
        um.setPassword(user.getPassword());
        um.setUsername(user.getUsername());
        um.setMobileNumber(user.getMobileNumber());
        um.setRole(user.getRole());
        userRepository.save(um);
    }

    public void deleteSave(int userId) {
        UserModel user = userRepository.findByUserId(userId);
        if(user.getRole().equals("user")){
            userRepository.deleteByUserId(userId);
        }
        
    }
}