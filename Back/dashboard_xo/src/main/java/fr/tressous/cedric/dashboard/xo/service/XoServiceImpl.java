package fr.tressous.cedric.dashboard.xo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.xo.model.Collaborateur;
import fr.tressous.cedric.dashboard.xo.model.CompteGeneral;
import fr.tressous.cedric.dashboard.xo.model.CompteTiers;
import fr.tressous.cedric.dashboard.xo.model.DocEntete;
import fr.tressous.cedric.dashboard.xo.model.DocLigne;
import fr.tressous.cedric.dashboard.xo.model.EcritureComptable;
import fr.tressous.cedric.dashboard.xo.repository.CollaborateurRepository;
import fr.tressous.cedric.dashboard.xo.repository.CompteGeneralRepository;
import fr.tressous.cedric.dashboard.xo.repository.CompteTiersRepository;
import fr.tressous.cedric.dashboard.xo.repository.DocEnteteRepository;
import fr.tressous.cedric.dashboard.xo.repository.DocLigneRepository;
import fr.tressous.cedric.dashboard.xo.repository.EcritureComptableRepository;

@Service
public class XoServiceImpl implements XoService {
	
	private CollaborateurRepository collaborateurRepo;
	private CompteTiersRepository compteTiersRepo;
	private CompteGeneralRepository compteRepo;
	private DocEnteteRepository docEnteteRepo;
	private DocLigneRepository docLigneRepo;
	private EcritureComptableRepository ecritureRepo;

	public XoServiceImpl(CollaborateurRepository collaborateurRepo, CompteTiersRepository compteTiersRepo,
			CompteGeneralRepository compteRepo, DocEnteteRepository docEnteteRepo, DocLigneRepository docLigneRepo,
			EcritureComptableRepository ecritureRepo) {
		this.collaborateurRepo = collaborateurRepo;
		this.compteTiersRepo = compteTiersRepo;
		this.compteRepo = compteRepo;
		this.docEnteteRepo = docEnteteRepo;
		this.docLigneRepo = docLigneRepo;
		this.ecritureRepo = ecritureRepo;
	}

	public List<Collaborateur> getAllCollaborateurs() {
		return collaborateurRepo.findAll();
	}
	
	public List<CompteTiers> getAllComptesT() {
		return compteTiersRepo.findAll();
	}
	
	public List<CompteGeneral> getAllComptesG() {
		return compteRepo.findAll();
	}
	
	public List<DocEntete> getAllDocEntetes() {
		return docEnteteRepo.findAll();
	}
	
	public List<DocLigne> getAllDocLignes() {
		return docLigneRepo.findAll();
	}
	
	public List<EcritureComptable> getAllEcritures() {
		return ecritureRepo.findAll();
	}

}
