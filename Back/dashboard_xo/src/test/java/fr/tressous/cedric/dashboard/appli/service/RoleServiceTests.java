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

import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.repository.RoleRepository;

@RunWith(MockitoJUnitRunner.class)
public class RoleServiceTests {

	@Mock
	RoleRepository roleRepo;
	
	private RoleService roleService;

	@Before
	public void setUp() throws Exception {
		roleService = new RoleServiceImpl(roleRepo);
	}
	
	@Test
	public void getAllRoles() {
		given(roleRepo.findAll()).willReturn(new ArrayList<Role>());

		List<Role> roles = roleService.getAllRoles();

		assertThat(roles).isNotNull();
	}
	
	@Test
	public void getAllRolesNotFound() {
		given(roleRepo.findAll()).willReturn(null);

		List<Role> roles = roleService.getAllRoles();

		assertThat(roles).isNull();
	}
	
	@Test
	public void createNewRole() {
		Role role = new Role("ROLE_TEST");
		given(roleRepo.save(role)).willReturn(role);

		Role savedRole = roleService.createNewRole(role);

		assertThat(savedRole.getRole()).isEqualTo("ROLE_TEST");
	}
	
	@Test
	public void createNewRoleFailed() {
		Role role = new Role("ROLE_TEST");
		given(roleRepo.save(role)).willReturn(null);

		Role savedRole = roleService.createNewRole(role);

		assertThat(savedRole).isNull();
	}
}

