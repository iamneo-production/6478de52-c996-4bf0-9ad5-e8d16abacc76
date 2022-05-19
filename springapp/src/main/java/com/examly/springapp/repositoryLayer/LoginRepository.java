package com.examly.springapp.repositoryLayer;

import com.examly.springapp.modelLayer.LoginModel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends CrudRepository<LoginModel,Integer> {

    boolean existsByEmailAndPassword(String email, String password);
    
}
