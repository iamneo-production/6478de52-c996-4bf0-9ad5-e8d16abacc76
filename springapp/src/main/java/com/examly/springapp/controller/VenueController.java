package com.examly.springapp.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.venuem;
import com.examly.springapp.repository.VenueRepo;
import com.examly.springapp.service.VenueDto;

@RestController
public class VenueController {
   @Autowired
   VenueRepo vrepo;
   @PostMapping("/admin/addVenue")
   public ResponseEntity<?> addVenue(@RequestBody VenueDto dto){
	   if(vrepo.existsByvenueName(dto.getVenueName()))
			   return new ResponseEntity<>("Venue already exist!",HttpStatus.BAD_REQUEST);
	   else {
		   if(dto.getVenueImageUrl().trim()==null||(dto.getVenueImageUrl().trim()==""))
				   return new ResponseEntity<>("Venue image url cannot be empty",HttpStatus.BAD_REQUEST);
		   else if(dto.getVenueName().trim()==null||dto.getVenueName().trim()==" ")
			       return new ResponseEntity<>("Venue name can't be empty",HttpStatus.BAD_REQUEST);
		   else if(dto.getVenueLocation().trim()==null||dto.getVenueLocation().trim()==" ")
		       return new ResponseEntity<>("Location cannot be empty",HttpStatus.BAD_REQUEST);
		   else {
			   venuem vm=new venuem();
			   vm.setVenueName(dto.getVenueName());
			   vm.setVenueId(dto.getVenueId());
			   vm.setVenueDescription(dto.getVenueDescription());
			   vm.setVenueLocation(dto.getVenueLocation());
			   vm.setVenueImageUrl(dto.getVenueImageUrl());
			   vm.setVenueCapacity(dto.getVenueCapacity());
			   vrepo.save(vm);
			   return new ResponseEntity<>("Venue added successfully",HttpStatus.OK);
		   }
	   }
   }
   @GetMapping("/admin/getVenue")
   public ResponseEntity<?> getVenue(){
	   List<venuem> l=vrepo.findAll();
	   if(l.isEmpty())
	   return new ResponseEntity<>("No venues found",HttpStatus.BAD_REQUEST);
	   else
	   return new ResponseEntity<>(l,HttpStatus.OK);
   }
//    @DeleteMapping("/admin/deleteVenue")
//    public ResponseEntity<?> deleteVenue(@RequestParam (name="venueId")int id){
// 	   if(vrepo.existsById(id))
// 	   {
// 		   vrepo.deleteById(id);
// 		   return new ResponseEntity<>("Venue deleted successfully",HttpStatus.OK);
// 	   }
// 	   else
// 		   return new ResponseEntity<>("No venue found",HttpStatus.NO_CONTENT);
//    }
   @PostMapping("/admin/deleteVenue/{id}")
   public ResponseEntity<?> deleteVenue(@PathVariable int id){
	   if(vrepo.existsById(id))
	   {
		   vrepo.deleteById(id);
		   return new ResponseEntity<>("Venue deleted successfully",HttpStatus.OK);
	   }
	   else
		   return new ResponseEntity<>("No venue found",HttpStatus.NO_CONTENT);
   }
   @PostMapping("/admin/editVenue/{id}")
   public ResponseEntity<?> editVenue(@PathVariable int id,@RequestBody VenueDto dto){
	   if(vrepo.existsById(id))
	   {
		   venuem vm=vrepo.getById(id);
		   if(dto.getVenueName().trim()!=null)
			vm.setVenueName(dto.getVenueName());
		   if(dto.getVenueImageUrl().trim()!=null)
			   vm.setVenueImageUrl(dto.getVenueImageUrl());
		   if(dto.getVenueLocation().trim()!=null)
			   vm.setVenueLocation(dto.getVenueLocation());
			// if(dto.getVenueCapacity().trim()!=null)
			   vm.setVenueCapacity(dto.getVenueCapacity());
		 vrepo.save(vm);
		 return new ResponseEntity<>("Venue edited successfully",HttpStatus.OK);
	   }
	   else
		   return new ResponseEntity<>("No venue found",HttpStatus.BAD_REQUEST);
   }
}