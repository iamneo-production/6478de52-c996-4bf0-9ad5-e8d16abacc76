package com.examly.springapp.repositoryLayer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.modelLayer.playerModel;

public interface PlayerRepo extends JpaRepository<playerModel,Integer> {
  public List<playerModel> findAllByTeamId(int teamId);
  
}
