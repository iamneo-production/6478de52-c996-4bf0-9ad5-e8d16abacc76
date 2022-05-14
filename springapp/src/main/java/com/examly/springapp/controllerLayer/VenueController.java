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

import com.examly.springapp.modelLayer.venuem;
import com.examly.springapp.repositoryLayer.VenueRepo;
import com.examly.springapp.serviceLayer.VenueDto;

@RestController
public class VenueController {
   @Autowired
   VenueRepo vrepo;
   @PostMapping("/admin/addVenue")
   public ResponseEntity<?> addVenue(@RequestBody VenueDto dto){
	   System.out.println("hello");
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
   @DeleteMapping("/admin/deleteVenue")
   public ResponseEntity<?> deleteVenue(@RequestParam (name="venueId")int id){
	   if(vrepo.existsById(id))
	   {
		   vrepo.deleteById(id);
		   return new ResponseEntity<>("Venue deleted successfully",HttpStatus.OK);
	   }
	   else
		   return new ResponseEntity<>("No venue found",HttpStatus.NO_CONTENT);
   }
   @PutMapping("/admin/editVenue")
   public ResponseEntity<?> editVenue(@RequestParam (name="venueId") int id,@RequestBody VenueDto dto){
	   if(vrepo.existsById(id))
	   {
		   venuem vm=vrepo.getById(id);
		   if(dto.getVenueName().trim()!=null)
			vm.setVenueName(dto.getVenueName());
		   if(dto.getVenueImageUrl().trim()!=null)
			   vm.setVenueImageUrl(dto.getVenueImageUrl());
		   if(dto.getVenueLocation().trim()!=null)
			   vm.setVenueLocation(dto.getVenueLocation());
		 vrepo.save(vm);
		 return new ResponseEntity<>("Venue edited successfully",HttpStatus.OK);
	   }
	   else
		   return new ResponseEntity<>("No venue found",HttpStatus.BAD_REQUEST);
   }
}
