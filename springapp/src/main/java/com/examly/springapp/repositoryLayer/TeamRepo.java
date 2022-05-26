package com.examly.springapp.repositoryLayer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.modelLayer.teamModel;

public interface TeamRepo extends JpaRepository<teamModel,Integer> {
public boolean existsByTeamName(String teamName);
}
