package com.examly.springapp.controllerLayer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.modelLayer.playerModel;
import com.examly.springapp.modelLayer.teamModel;
import com.examly.springapp.repositoryLayer.PlayerRepo;
import com.examly.springapp.repositoryLayer.TeamRepo;
import com.examly.springapp.serviceLayer.VenueDto;

@RestController
public class TeamController {
	@Autowired
	TeamRepo trepo;
	@Autowired
	PlayerRepo prepo;
	@PostMapping("/admin/addTeam")
	public ResponseEntity<?> addTeam(@RequestBody teamModel tm){
		if(!trepo.existsByTeamName(tm.getTeamName())) {
		if(tm.getTeamName().trim().equals(null))
			return new ResponseEntity<>("Team name cannot be empty",HttpStatus.BAD_REQUEST);
		else if(tm.getTeamImageUrl().trim().equals(null))
			return new ResponseEntity<>("Enter team image url",HttpStatus.BAD_REQUEST);
		else if(tm.getTeamLocation().trim().equals(null))
			return new ResponseEntity<>("Enter team location",HttpStatus.BAD_REQUEST);
		else {
			trepo.save(tm);
			return new ResponseEntity<>("Team added sucessfully",HttpStatus.OK);
		}
		}
		else
			return new ResponseEntity<>("Team already exists with that name",HttpStatus.BAD_REQUEST);
	}
	@GetMapping("/admin/getTeam")
	public ResponseEntity<?> getTeam(){
		List<teamModel> l=trepo.findAll();
		if(l.size()>0)
			return new ResponseEntity<>("No team found",HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<>(l,HttpStatus.OK);
	}
	@PutMapping("/admin/editTeam")
	   public ResponseEntity<?> editTeam(@RequestParam (name="teamId") int id,@RequestBody teamModel tm){
		if(trepo.existsById(id)) {
		if(tm.getTeamName().trim().equals(null))
			return new ResponseEntity<>("Team name cannot be empty",HttpStatus.BAD_REQUEST);
		else if(tm.getTeamImageUrl().trim().equals(null))
			return new ResponseEntity<>("Enter team image url",HttpStatus.BAD_REQUEST);
		else if(tm.getTeamLocation().trim().equals(null))
			return new ResponseEntity<>("Enter team location",HttpStatus.BAD_REQUEST);
		else {
			tm.setTeamId(id);
			trepo.save(tm);
			return new ResponseEntity<>("Team edited sucessfully",HttpStatus.OK);
		}
		}
		else
			return new ResponseEntity<>("Team not found",HttpStatus.BAD_REQUEST);
	}
	@DeleteMapping("/admin/deleteTeam")
	public ResponseEntity<?> deleteTeam(@RequestParam (name="teamId") int id){
		if(trepo.existsById(id)) {
			trepo.deleteById(id);
			return new ResponseEntity<>("Team deleted sucessfully",HttpStatus.OK);
		}
		else
			return new ResponseEntity<>("Team not found",HttpStatus.BAD_REQUEST);
	}
	@PostMapping("/admin/addPlayer")
	public ResponseEntity<?> addPlayer(@RequestParam (name="teamId") int id,@RequestBody playerModel pm){
		if(trepo.existsById(id)) {
			pm.setTeamId(id);
		if(pm.getFirstName().trim().equals(null))
			return new ResponseEntity<>("First name cannot be empty",HttpStatus.BAD_REQUEST);
		else if(pm.getLastName().trim().equals(null))
			return new ResponseEntity<>("Last name cannot be empty",HttpStatus.BAD_REQUEST);
		else if(pm.getGender().trim().equals(null))
			return new ResponseEntity<>("Enter Gender",HttpStatus.BAD_REQUEST);
		else {
			prepo.save(pm);
			return new ResponseEntity<>("Player added sucessfully",HttpStatus.OK);
		}
	}
		else {
			return new ResponseEntity<>("Team does not exist",HttpStatus.BAD_REQUEST);
		}
	}
	@DeleteMapping("/admin/deletePlayer")
	public ResponseEntity<?> deletePlayer(@RequestParam (name="playerId") int id){
		if(prepo.existsById(id)) {
			prepo.deleteById(id);
			return new ResponseEntity<>("Player deleted sucessfully",HttpStatus.OK);
		}
		else
			return new ResponseEntity<>("Player not found",HttpStatus.NOT_FOUND);
	}
	@GetMapping("admin/getPlayers")
	public ResponseEntity<?> getPlayer(@RequestParam (name="teamId") int id){
		if(trepo.existsById(id)) {
		if(prepo.existsById(id)) {
		List<playerModel> l=prepo.findAllByTeamId(id);
		return new ResponseEntity<>(l,HttpStatus.OK);
		}
		else
			return new ResponseEntity<>("No player found",HttpStatus.NOT_FOUND);
		}
		else
			return new ResponseEntity<>("Team not exist",HttpStatus.NOT_FOUND);
	}
	@PutMapping("admin/editPlayer")
	public ResponseEntity<?> editPlayer(@RequestParam (name="playerId") int id,@RequestBody playerModel pm){
		if(prepo.existsById(id)) {
			pm.setPlayerId(id);
			prepo.save(pm);
			return new ResponseEntity<>("Player edited sucessfully",HttpStatus.OK);
		}
		else
			return new ResponseEntity<>("Player not found",HttpStatus.NOT_FOUND);
	}
}

