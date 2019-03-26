package fr.tressous.cedric.dashboard.appli.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.repository.UserRepository;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTests {

	@Mock
	UserRepository userRepo;
	
	private UserService userService;

	@Before
	public void setUp() throws Exception {
		userService = new UserServiceImpl(userRepo);
	}
	
	@Test
	public void getAllUsers() {
		given(userRepo.findAll()).willReturn(new ArrayList<User>());

		List<User> users = userService.getAllUsers();

		assertThat(users).isNotNull();
	}
	
	@Test
	public void getAllUsersNotFound() {
		given(userRepo.findAll()).willReturn(null);

		List<User> users = userService.getAllUsers();

		assertThat(users).isNull();
	}
	
	@Test
	public void createNewUser() {
		User user = new User("test", "password", new Role("ROLE_TEST"));
		given(userRepo.save(user)).willReturn(user);

		User savedUser = userService.createNewUser(user);

		assertThat(savedUser.getUsername()).isEqualTo("test");
		assertThat(savedUser.getRole().getRole()).isEqualTo("ROLE_TEST");
	}
	
	@Test
	public void createNewUserFailed() {
		User user = new User("test", "password", new Role("ROLE_TEST"));
		given(userRepo.save(user)).willReturn(null);

		User savedUser = userService.createNewUser(user);

		assertThat(savedUser).isNull();
	}
	
	@Test
	public void updateUser() {
		User user = new User("test", "password", new Role("ROLE_TEST"));
		given(userRepo.saveAndFlush(user)).willReturn(user);

		User savedUser = userService.updateUser(user);

		assertThat(savedUser.getUsername()).isEqualTo("test");
		assertThat(savedUser.getRole().getRole()).isEqualTo("ROLE_TEST");
	}
	
	@Test
	public void updateUserFail() {
		User user = new User("test", "password", new Role("ROLE_TEST"));
		given(userRepo.saveAndFlush(user)).willReturn(null);

		User savedUser = userService.updateUser(user);

		assertThat(savedUser).isNull();
	}

}
