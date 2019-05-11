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

import fr.tressous.cedric.dashboard.appli.model.Colis;
import fr.tressous.cedric.dashboard.appli.service.ColisService;

@RestController
@RequestMapping("/api/colis")
@CrossOrigin("*")
public class ColisController {
	
	@Autowired
	private ColisService colisService;
	
	/**
	 * Method that send a list of packets out of the application.
	 * @return the list of packets.
	 */
	@GetMapping
	public List<Colis> getColis() {
		return colisService.getAllColis();
	}
	
	/**
	 * Method that send a packet into the database of the application.
	 * @param newColis the packet to add.
	 * @return the packet.
	 */
	@PostMapping
	public ResponseEntity<Colis> createColis(@RequestBody Colis newColis) {
		return ResponseEntity.ok(colisService.createNewColis(newColis));
	}
	
	/**
	 * Method that update a packet from the database of the application.
	 * @param colis the packet to update.
	 * @return the packet.
	 */
	@PutMapping
	public ResponseEntity<Colis> updateColis(@RequestBody Colis colis) {
		return ResponseEntity.ok(colisService.updateColis(colis));
	}
	
	/**
	 * Method that delete a packet from the database of the application.
	 * @param id the id of the to delete.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteColis(@PathVariable Long id) {
		try {
			colisService.deleteColis(id);
			return ResponseEntity.ok(null);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

}
