package fr.tressous.cedric.dashboard.xo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.xo.model.DocEntete;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RestController
@RequestMapping("/api/docentete")
@CrossOrigin("*")
public class DocEnteteController {
	
	@Autowired
	private XoService xoService;
	
	/**
	 * Method that send a list of documents out of the application.
	 * @return the list of documents.
	 */
	@GetMapping
	public List<DocEntete> getDocEntetes() {
		return xoService.getAllDocEntetes();
	}

}
