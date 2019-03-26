package fr.tressous.cedric.dashboard.appli.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import fr.tressous.cedric.dashboard.appli.model.Colis;
import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.repository.ColisRepository;

@RunWith(MockitoJUnitRunner.class)
public class ColisServiceTests {

	@Mock
	ColisRepository colisRepo;
	
	private ColisService colisService;

	@Before
	public void setUp() throws Exception {
		colisService = new ColisServiceImpl(colisRepo);
	}
	
	@Test
	public void getAllColis() {
		given(colisRepo.findAll()).willReturn(new ArrayList<Colis>());

		List<Colis> colis = colisService.getAllColis();

		assertThat(colis).isNotNull();
	}
	
	@Test
	public void getAllColisNotFound() {
		given(colisRepo.findAll()).willReturn(null);

		List<Colis> colis = colisService.getAllColis();

		assertThat(colis).isNull();
	}
	
	@Test
	public void createNewColis() {
		Colis colis = new Colis(7, new Date(), new User("test", "password", new Role("ROLE_TEST")));
		given(colisRepo.save(colis)).willReturn(colis);

		Colis savedColis = colisService.createNewColis(colis);

		assertThat(savedColis.getNbreColis()).isEqualTo(7);
		assertThat(savedColis.getUser().getRole().getRole()).isEqualTo("ROLE_TEST");
	}
	
	@Test
	public void createNewColisFailed() {
		Colis colis = new Colis(7, new Date(), new User("test", "password", new Role("ROLE_TEST")));
		given(colisRepo.save(colis)).willReturn(null);

		Colis savedColis = colisService.createNewColis(colis);

		assertThat(savedColis).isNull();
	}
	
	@Test
	public void updateColis() {
		Colis colis = new Colis(7, new Date(), new User("test", "password", new Role("ROLE_TEST")));
		given(colisRepo.saveAndFlush(colis)).willReturn(colis);

		Colis savedColis = colisService.updateColis(colis);

		assertThat(savedColis.getNbreColis()).isEqualTo(7);
		assertThat(savedColis.getUser().getRole().getRole()).isEqualTo("ROLE_TEST");
	}
	
	@Test
	public void updateColisFailed() {
		Colis colis = new Colis(7, new Date(), new User("test", "password", new Role("ROLE_TEST")));
		given(colisRepo.saveAndFlush(colis)).willReturn(null);

		Colis savedColis = colisService.updateColis(colis);

		assertThat(savedColis).isNull();
	}

}
