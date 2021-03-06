package fr.tressous.cedric.dashboard.xo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.xo.model.CompteTiers;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RestController
@RequestMapping("/api/comptet")
@CrossOrigin("*")
public class CompteTiersController {
	
	@Autowired
	private XoService xoService;
	
	/**
	 * Method that send a list of third-party accounts out of the application.
	 * @return the list of third-party accounts.
	 */
	@GetMapping
	public List<CompteTiers> getComptesT() {
		return xoService.getAllComptesT();
	}

}
