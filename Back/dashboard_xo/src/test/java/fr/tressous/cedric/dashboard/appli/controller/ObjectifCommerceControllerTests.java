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
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import fr.tressous.cedric.dashboard.appli.model.ObjectifCommerce;
import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.service.ColisService;
import fr.tressous.cedric.dashboard.appli.service.MessageService;
import fr.tressous.cedric.dashboard.appli.service.ObjectifCommerceService;
import fr.tressous.cedric.dashboard.appli.service.RoleService;
import fr.tressous.cedric.dashboard.appli.service.UserService;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RunWith(SpringRunner.class)
@WebMvcTest
public class ObjectifCommerceControllerTests {

	@Autowired
	MockMvc mockMvc;
	@MockBean
	ColisService colisService;
	@MockBean
	UserService userService;
	@MockBean
	MessageService messageService;
	@MockBean
	ObjectifCommerceService objectifService;
	@MockBean
	RoleService roleService;
	@MockBean
	XoService xoService;
	
	@Test
	public void getObjectifsCommerce() throws Exception {
		when(this.objectifService.getAllObjectifsCommerce()).thenReturn(new ArrayList<ObjectifCommerce>());

		this.mockMvc.perform(get("/api/objectif")).andExpect(status().isOk());
	}
	
	@Test
	public void getObjectifsCommerceNotFound() throws Exception {
		when(this.objectifService.getAllObjectifsCommerce()).thenReturn(null);

		this.mockMvc.perform(get("/api/objectifs")).andExpect(status().isNotFound());
	}
	
	@Test
	public void createObjectifCommerce() throws Exception {
		when(this.objectifService.createNewObjectifCommerce((ObjectifCommerce) any())).thenReturn(new ObjectifCommerce("intitule test", new Date(), 77777, new User("test", "password", new Role("ROLE_TEST"))));

		this.mockMvc.perform(post("/api/objectif").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content("{\"intitule\": \"intitule test\", \"user\": {\"username\": \"test\", \"password\": \"password\", \"role\": {\"role\": \"ROLE_TEST\"}}}"))
					.andExpect(status().isOk())
					.andExpect(jsonPath("intitule").value("intitule test"))
					.andExpect(jsonPath("user.username").value("test"))
					.andExpect(jsonPath("user.role.role").value("ROLE_TEST"));
	}
	
	@Test
	public void createObjectifCommerceFail() throws Exception {
		when(this.objectifService.createNewObjectifCommerce((ObjectifCommerce) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/objectifs").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	public void updateObjectifCommerce() throws Exception {
		when(this.objectifService.updateObjectifCommerce((ObjectifCommerce) any())).thenReturn(new ObjectifCommerce("intitule test", new Date(), 77777, new User("test", "password", new Role("ROLE_TEST"))));

		this.mockMvc.perform(put("/api/objectif").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content("{\"intitule\": \"intitule test\", \"user\": {\"username\": \"test\", \"password\": \"password\", \"role\": {\"role\": \"ROLE_TEST\"}}}"))
					.andExpect(status().isOk())
					.andExpect(jsonPath("intitule").value("intitule test"))
					.andExpect(jsonPath("user.username").value("test"))
					.andExpect(jsonPath("user.role.role").value("ROLE_TEST"));
	}
	
	@Test
	public void updateObjectifCommerceFail() throws Exception {
		when(this.objectifService.updateObjectifCommerce((ObjectifCommerce) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/objectifs").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	public void deleteObjectifCommerce() throws Exception {

		this.mockMvc.perform(delete("/api/objectif/3"))
				.andExpect(status().isOk());
	}
	
	@Test
	public void deleteObjectifCommerceNotFound() throws Exception {

		this.mockMvc.perform(delete("/api/objectifs/2"))
				.andExpect(status().isNotFound());
	}

}
