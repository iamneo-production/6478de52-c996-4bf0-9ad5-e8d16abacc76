package com.examly.springapp.repositoryLayer;

import com.examly.springapp.modelLayer.UserModel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserModel,Integer>{
    public UserModel findById(int userId);

    public boolean existsByEmail(String email);

    public boolean existsByUsername(String username);

    public UserModel findByUserId(int userId);

    public UserModel getUserModelByUserId(int userId);

    public void deleteByUserId(int userId);

    public UserModel findByEmail(String userName);
}
