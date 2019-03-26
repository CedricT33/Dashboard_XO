package fr.tressous.cedric.dashboard.xo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

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

@RunWith(MockitoJUnitRunner.class)
public class XoServiceTests {

	@Mock
	CollaborateurRepository collaborateurRepo;
	@Mock
	CompteGeneralRepository compteGRepo;
	@Mock
	CompteTiersRepository compteTRepo;
	@Mock
	DocEnteteRepository docEnteteRepo;
	@Mock
	DocLigneRepository docLigneRepo;
	@Mock
	EcritureComptableRepository ecritureComptableRepo;
	
	private XoService xoService;

	@Before
	public void setUp() throws Exception {
		xoService = new XoServiceImpl(collaborateurRepo, compteTRepo, compteGRepo, docEnteteRepo, docLigneRepo, ecritureComptableRepo);
	}
	
	@Test
	public void getAllCollaborateurs() {
		given(collaborateurRepo.findAll()).willReturn(new ArrayList<Collaborateur>());

		List<Collaborateur> collaborateurs = xoService.getAllCollaborateurs();

		assertThat(collaborateurs).isNotNull();
	}
	
	@Test
	public void getAllCollaborateursFailed() {
		given(collaborateurRepo.findAll()).willReturn(null);

		List<Collaborateur> collaborateurs = xoService.getAllCollaborateurs();

		assertThat(collaborateurs).isNull();
	}
	
	@Test
	public void getAllComptesT() {
		given(compteTRepo.findAll()).willReturn(new ArrayList<CompteTiers>());

		List<CompteTiers> comptet = xoService.getAllComptesT();

		assertThat(comptet).isNotNull();
	}
	
	@Test
	public void getAllComptesTFailed() {
		given(compteTRepo.findAll()).willReturn(null);

		List<CompteTiers> comptet = xoService.getAllComptesT();

		assertThat(comptet).isNull();
	}
	
	@Test
	public void getAllComptesG() {
		given(compteGRepo.findAll()).willReturn(new ArrayList<CompteGeneral>());

		List<CompteGeneral> compteg = xoService.getAllComptesG();

		assertThat(compteg).isNotNull();
	}
	
	@Test
	public void getAllComptesGFailed() {
		given(compteGRepo.findAll()).willReturn(null);

		List<CompteGeneral> compteg = xoService.getAllComptesG();

		assertThat(compteg).isNull();
	}
	
	@Test
	public void getAllDocEntetes() {
		given(docEnteteRepo.findAll()).willReturn(new ArrayList<DocEntete>());

		List<DocEntete> docs = xoService.getAllDocEntetes();

		assertThat(docs).isNotNull();
	}
	
	@Test
	public void getAllDocEntetesFailed() {
		given(docEnteteRepo.findAll()).willReturn(null);

		List<DocEntete> docs = xoService.getAllDocEntetes();

		assertThat(docs).isNull();
	}
	
	@Test
	public void getAllDocLignes() {
		given(docLigneRepo.findAll()).willReturn(new ArrayList<DocLigne>());

		List<DocLigne> docs = xoService.getAllDocLignes();

		assertThat(docs).isNotNull();
	}
	
	@Test
	public void getAllDocLignesFailed() {
		given(docLigneRepo.findAll()).willReturn(null);

		List<DocLigne> docs = xoService.getAllDocLignes();

		assertThat(docs).isNull();
	}
	
	@Test
	public void getAllEcritures() {
		given(ecritureComptableRepo.findAll()).willReturn(new ArrayList<EcritureComptable>());

		List<EcritureComptable> ecritures = xoService.getAllEcritures();

		assertThat(ecritures).isNotNull();
	}
	
	@Test
	public void getAllEcrituresFailed() {
		given(ecritureComptableRepo.findAll()).willReturn(null);

		List<EcritureComptable> ecritures = xoService.getAllEcritures();

		assertThat(ecritures).isNull();
	}
}
