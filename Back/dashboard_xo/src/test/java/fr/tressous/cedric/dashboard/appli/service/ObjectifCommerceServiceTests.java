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

import fr.tressous.cedric.dashboard.appli.model.ObjectifCommerce;
import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.repository.ObjectifCommerceRepository;

@RunWith(MockitoJUnitRunner.class)
public class ObjectifCommerceServiceTests {

	@Mock
	ObjectifCommerceRepository objectifRepo;
	
	private ObjectifCommerceService objectifService;

	@Before
	public void setUp() throws Exception {
		objectifService = new ObjectifCommerceServiceImpl(objectifRepo);
	}
	
	@Test
	public void getAllObjectifCommerces() {
		given(objectifRepo.findAll()).willReturn(new ArrayList<ObjectifCommerce>());

		List<ObjectifCommerce> objectifs = objectifService.getAllObjectifsCommerce();

		assertThat(objectifs).isNotNull();
	}
	
	@Test
	public void getAllObjectifCommercesNotFound() {
		given(objectifRepo.findAll()).willReturn(null);

		List<ObjectifCommerce> objectifs = objectifService.getAllObjectifsCommerce();

		assertThat(objectifs).isNull();
	}
	
	@Test
	public void createNewObjectifCommerce() {
		ObjectifCommerce objectif = new ObjectifCommerce("intitule test", new Date(), 77777, new User("test", "password", new Role("ROLE_TEST")));
		given(objectifRepo.save(objectif)).willReturn(objectif);

		ObjectifCommerce savedObjectif = objectifService.createNewObjectifCommerce(objectif);

		assertThat(savedObjectif.getIntitule()).isEqualTo("intitule test");
		assertThat(savedObjectif.getUser().getRole().getRole()).isEqualTo("ROLE_TEST");
	}
	
	@Test
	public void createNewObjectifCommerceFailed() {
		ObjectifCommerce objectif = new ObjectifCommerce("intitule test", new Date(), 77777, new User("test", "password", new Role("ROLE_TEST")));
		given(objectifRepo.save(objectif)).willReturn(null);

		ObjectifCommerce savedObjectif = objectifService.createNewObjectifCommerce(objectif);

		assertThat(savedObjectif).isNull();
	}
	
	@Test
	public void updateObjectifCommerce() {
		ObjectifCommerce objectif = new ObjectifCommerce("intitule test", new Date(), 77777, new User("test", "password", new Role("ROLE_TEST")));
		given(objectifRepo.saveAndFlush(objectif)).willReturn(objectif);

		ObjectifCommerce savedObjectif = objectifService.updateObjectifCommerce(objectif);

		assertThat(savedObjectif.getIntitule()).isEqualTo("intitule test");
		assertThat(savedObjectif.getUser().getRole().getRole()).isEqualTo("ROLE_TEST");
	}
	
	@Test
	public void updateObjectifCommerceFail() {
		ObjectifCommerce objectif = new ObjectifCommerce("intitule test", new Date(), 77777, new User("test", "password", new Role("ROLE_TEST")));
		given(objectifRepo.saveAndFlush(objectif)).willReturn(null);

		ObjectifCommerce savedObjectifCommerce = objectifService.updateObjectifCommerce(objectif);

		assertThat(savedObjectifCommerce).isNull();
	}

}

