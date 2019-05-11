package fr.tressous.cedric.dashboard.appli.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.appli.model.ObjectifCommerce;
import fr.tressous.cedric.dashboard.appli.service.ObjectifCommerceService;

@RestController
@RequestMapping("/api/objectif")
@CrossOrigin("*")
public class ObjectifCommerceController {
	
	@Autowired
	private ObjectifCommerceService objectifService;
	
	/**
	 * Method that send a list of goals out of the application.
	 * @return the list of goals.
	 */
	@GetMapping
	public List<ObjectifCommerce> getObjectifsCommerce() {
		return objectifService.getAllObjectifsCommerce();
	}
	
	/**
	 * Method that send a goal into the database of the application.
	 * @return the goal.
	 */
	@PostMapping
	public ResponseEntity<ObjectifCommerce> createObjectifCommerce(@RequestBody ObjectifCommerce newObjectifCommerce) {
		return ResponseEntity.ok(objectifService.createNewObjectifCommerce(newObjectifCommerce));
	}
	
	/**
	 * Method that update a goal from the database of the application.
	 * @param objectif the goal to update.
	 * @return the goal.
	 */
	@PutMapping
	public ResponseEntity<ObjectifCommerce> updateObjectifCommerce(@RequestBody ObjectifCommerce objectif) {
		return ResponseEntity.ok(objectifService.updateObjectifCommerce(objectif));
	}
	
	/**
	 * Method that delete a goal from the database of the application.
	 * @param id the id of the goal to delete.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteObjectifCommerce(@PathVariable Long id) {
		try {
			objectifService.deleteObjectifCommerce(id);
			return ResponseEntity.ok(null);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
}
