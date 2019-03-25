package fr.tressous.cedric.dashboard.xo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.xo.model.CompteGeneral;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RestController
@RequestMapping("/api/compteg")
@CrossOrigin("*")
public class CompteGeneralController {
	
	@Autowired
	private XoService xoService;
	
	/**
	 * Method that send a list of general accounts out of the application.
	 * @return the list of general accounts.
	 */
	@GetMapping
	public List<CompteGeneral> getComptesG() {
		return xoService.getAllComptesG();
	}

}
