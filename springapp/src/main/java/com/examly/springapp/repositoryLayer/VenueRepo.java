package com.examly.springapp.repositoryLayer;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.modelLayer.venuem;

public interface VenueRepo extends JpaRepository<venuem,Integer> {
public venuem findById(int id);
public boolean existsById(int id);
public boolean existsByvenueName(String venueName);
}
