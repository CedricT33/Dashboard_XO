package fr.tressous.cedric.dashboard.xo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.xo.model.DocLigne;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RestController
@RequestMapping("/api/docligne")
public class DocLigneController {
	
	@Autowired
	private XoService xoService;
	
	/**
	 * Method that send a list of documents out of the application.
	 * @return the list of documents.
	 */
	@GetMapping
	public List<DocLigne> getDocLignes() {
		return xoService.getAllDocLignes();
	}

}
