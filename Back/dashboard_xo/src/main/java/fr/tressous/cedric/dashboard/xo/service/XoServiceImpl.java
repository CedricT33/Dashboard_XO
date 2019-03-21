package fr.tressous.cedric.dashboard.xo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.xo.model.Collaborateur;
import fr.tressous.cedric.dashboard.xo.model.CompteGeneral;
import fr.tressous.cedric.dashboard.xo.model.CompteTiers;
import fr.tressous.cedric.dashboard.xo.model.Document;
import fr.tressous.cedric.dashboard.xo.model.EcritureComptable;
import fr.tressous.cedric.dashboard.xo.repository.CollaborateurRepository;
import fr.tressous.cedric.dashboard.xo.repository.CompteGeneralRepository;
import fr.tressous.cedric.dashboard.xo.repository.CompteTiersRepository;
import fr.tressous.cedric.dashboard.xo.repository.DocumentRepository;
import fr.tressous.cedric.dashboard.xo.repository.EcritureComptableRepository;

@Service
public class XoServiceImpl implements XoService {
	
	@Autowired
	private CollaborateurRepository collaborateurRepo;
	@Autowired
	private CompteTiersRepository compteTiersRepo;
	@Autowired
	private CompteGeneralRepository compteRepo;
	@Autowired
	private DocumentRepository documentRepo;
	@Autowired
	private EcritureComptableRepository ecritureRepo;
	
	public List<Collaborateur> getAllCollaborateurs() {
		return collaborateurRepo.findAll();
	}
	
	public List<CompteTiers> getAllComptesT() {
		return compteTiersRepo.findAll();
	}
	
	public List<CompteGeneral> getAllComptesG() {
		return compteRepo.findAll();
	}
	
	public List<Document> getAllDocuments() {
		return documentRepo.findAll();
	}
	
	public List<EcritureComptable> getAllEcritures() {
		return ecritureRepo.findAll();
	}

}
