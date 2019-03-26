package fr.tressous.cedric.dashboard.appli.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.service.ColisService;
import fr.tressous.cedric.dashboard.appli.service.MessageService;
import fr.tressous.cedric.dashboard.appli.service.UserService;
import fr.tressous.cedric.dashboard.appli.service.ObjectifCommerceService;
import fr.tressous.cedric.dashboard.appli.service.RoleService;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RunWith(SpringRunner.class)
@WebMvcTest
public class UserControllerTests {

	@Autowired
	MockMvc mockMvc;
	@MockBean
	ColisService colisService;
	@MockBean
	MessageService messageService;
	@MockBean
	UserService userService;
	@MockBean
	ObjectifCommerceService objectifService;
	@MockBean
	RoleService roleService;
	@MockBean
	XoService xoService;
	
	@Test
	public void getUsers() throws Exception {
		when(this.userService.getAllUsers()).thenReturn(new ArrayList<User>());

		this.mockMvc.perform(get("/api/user")).andExpect(status().isOk());
	}
	
	@Test
	public void getUsersNotFound() throws Exception {
		when(this.userService.getAllUsers()).thenReturn(null);

		this.mockMvc.perform(get("/api/use")).andExpect(status().isNotFound());
	}
	
	@Test
	public void createUser() throws Exception {
		when(this.userService.createNewUser((User) any())).thenReturn(new User("test", "password", new Role("ROLE_TEST")));

		this.mockMvc.perform(post("/api/user").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content("{\"username\": \"test\", \"password\": \"password\", \"role\": {\"role\": \"ROLE_TEST\"}}"))
					.andExpect(status().isOk())
					.andExpect(jsonPath("username").value("test"))
					.andExpect(jsonPath("role.role").value("ROLE_TEST"));
	}
	
	@Test
	public void createUserFail() throws Exception {
		when(this.userService.createNewUser((User) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/user").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	public void updateUser() throws Exception {
		when(this.userService.updateUser((User) any())).thenReturn(new User("test", "password", new Role("ROLE_TEST")));

		this.mockMvc.perform(put("/api/user").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content("{\"username\": \"test\", \"password\": \"password\", \"role\": {\"role\": \"ROLE_TEST\"}}"))
					.andExpect(status().isOk())
					.andExpect(jsonPath("username").value("test"))
					.andExpect(jsonPath("role.role").value("ROLE_TEST"));
	}
	
	@Test
	public void updateUserFail() throws Exception {
		when(this.userService.updateUser((User) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/use").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	public void deleteUser() throws Exception {

		this.mockMvc.perform(delete("/api/user/3"))
				.andExpect(status().isOk());
	}
	
	@Test
	public void deleteUserNotFound() throws Exception {

		this.mockMvc.perform(delete("/api/use/2"))
				.andExpect(status().isNotFound());
	}

}
