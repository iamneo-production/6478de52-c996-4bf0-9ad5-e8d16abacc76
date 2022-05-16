package com.examly.springapp.repository;

import com.examly.springapp.model.LoginModel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends CrudRepository<LoginModel,Integer> {

    boolean existsByEmailAndPassword(String email, String password);
    
}
