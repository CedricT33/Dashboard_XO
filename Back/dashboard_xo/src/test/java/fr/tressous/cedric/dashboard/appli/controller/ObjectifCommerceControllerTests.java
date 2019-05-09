package fr.tressous.cedric.dashboard.appli.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import fr.tressous.cedric.dashboard.appli.model.ObjectifCommerce;
import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.service.ObjectifCommerceService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ObjectifCommerceControllerTests {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	ObjectifCommerceService objectifService;

	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getObjectifsCommerce() throws Exception {
		when(this.objectifService.getAllObjectifsCommerce()).thenReturn(new ArrayList<ObjectifCommerce>());

		this.mockMvc.perform(get("/api/objectif")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getObjectifsCommerceNotFound() throws Exception {
		when(this.objectifService.getAllObjectifsCommerce()).thenReturn(null);

		this.mockMvc.perform(get("/api/objectifs")).andExpect(status().isNotFound());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
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
	@WithMockUser(roles={"ADMIN"})
	public void createObjectifCommerceFail() throws Exception {
		when(this.objectifService.createNewObjectifCommerce((ObjectifCommerce) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/objectifs").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void updateObjectifCommerce() throws Exception {
		ObjectifCommerce objectif = new ObjectifCommerce("intitule test", new Date(), 77777, new User("test", "password", new Role("ROLE_TEST")));
		when(this.objectifService.updateObjectifCommerce((ObjectifCommerce) any())).thenReturn(objectif);

		this.mockMvc.perform(put("/api/objectif").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content("{\"intitule\": \"intitule test\", \"user\": {\"username\": \"test\", \"password\": \"password\", \"role\": {\"role\": \"ROLE_TEST\"}}}"))
					.andExpect(status().isOk())
					.andExpect(jsonPath("intitule").value("intitule test"))
					.andExpect(jsonPath("user.username").value("test"))
					.andExpect(jsonPath("user.role.role").value("ROLE_TEST"));
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void updateObjectifCommerceFail() throws Exception {
		when(this.objectifService.updateObjectifCommerce((ObjectifCommerce) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/objectifs").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void deleteObjectifCommerce() throws Exception {
		
		doNothing().when(this.objectifService).deleteObjectifCommerce(3L);

		this.mockMvc.perform(delete("/api/objectif/3"))
				.andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void deleteObjectifCommerceNotFound() throws Exception {

		this.mockMvc.perform(delete("/api/objectifs/2"))
				.andExpect(status().isNotFound());
	}

}
