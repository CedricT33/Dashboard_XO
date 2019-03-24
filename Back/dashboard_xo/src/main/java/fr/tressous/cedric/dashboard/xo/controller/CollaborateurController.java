package fr.tressous.cedric.dashboard.xo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.xo.model.Collaborateur;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RestController
@RequestMapping("/api/collaborateur")
@CrossOrigin("*")
public class CollaborateurController {
	
	@Autowired
	private XoService xoService;
	
	/**
	 * Method that send a list of employee members out of the application.
	 * @return the list of employee members.
	 */
	@GetMapping
	public List<Collaborateur> getCollaborateurs() {
		return xoService.getAllCollaborateurs();
	}

}
