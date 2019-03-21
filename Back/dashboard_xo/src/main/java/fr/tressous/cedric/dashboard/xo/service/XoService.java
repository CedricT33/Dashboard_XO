package fr.tressous.cedric.dashboard.xo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.xo.model.Collaborateur;
import fr.tressous.cedric.dashboard.xo.model.CompteGeneral;
import fr.tressous.cedric.dashboard.xo.model.CompteTiers;
import fr.tressous.cedric.dashboard.xo.model.Document;
import fr.tressous.cedric.dashboard.xo.model.EcritureComptable;

@Service
public interface XoService {
	
	/**
	 * Method that return a list of employee members in the application.
	 * @return the list of employee members.
	 */
	public List<Collaborateur> getAllCollaborateurs();
	
	/**
	 * Method that return a list of accounting records in the application.
	 * @return the list of accounting records.
	 */
	public List<CompteTiers> getAllComptesT();
	
	/**
	 * Method that return a list of general accounts in the application.
	 * @return the list of general accounts.
	 */
	public List<CompteGeneral> getAllComptesG();
	
	/**
	 * Method that return a list of documents in the application.
	 * @return the list of documents.
	 */
	public List<Document> getAllDocuments();
	
	/**
	 * Method that return a list of accounting records in the application.
	 * @return the list of accounting records.
	 */
	public List<EcritureComptable> getAllEcritures();

}
