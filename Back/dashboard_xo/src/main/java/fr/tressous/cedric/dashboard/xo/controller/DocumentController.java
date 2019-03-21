package fr.tressous.cedric.dashboard.xo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.xo.model.Document;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RestController
@RequestMapping("/api/document")
public class DocumentController {
	
	@Autowired
	private XoService xoService;
	
	/**
	 * Method that send a list of documents out of the application.
	 * @return the list of documents.
	 */
	@GetMapping
	public List<Document> getDocuments() {
		return xoService.getAllDocuments();
	}

}
