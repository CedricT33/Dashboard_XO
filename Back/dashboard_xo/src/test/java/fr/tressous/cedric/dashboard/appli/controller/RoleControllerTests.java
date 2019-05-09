package fr.tressous.cedric.dashboard.appli.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.service.RoleService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class RoleControllerTests {
	
	@Autowired
	MockMvc mockMvc;

	@MockBean
	RoleService roleService;

	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getRoles()throws Exception {
		when(this.roleService.getAllRoles()).thenReturn(new ArrayList<Role>());

		this.mockMvc.perform(get("/api/role")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getRolesNotFound()throws Exception {
		when(this.roleService.getAllRoles()).thenReturn(null);

		this.mockMvc.perform(get("/api/rol")).andExpect(status().isNotFound());
	}

}
