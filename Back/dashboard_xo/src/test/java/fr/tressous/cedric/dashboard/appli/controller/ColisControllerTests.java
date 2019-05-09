package fr.tressous.cedric.dashboard.appli.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
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
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import fr.tressous.cedric.dashboard.appli.model.Colis;
import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.service.ColisService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ColisControllerTests {

	@Autowired
	MockMvc mockMvc;
	
	@MockBean
	ColisService colisService;
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getColis() throws Exception {
		when(this.colisService.getAllColis()).thenReturn(new ArrayList<Colis>());

		this.mockMvc.perform(get("/api/colis")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getColisNotFound() throws Exception {
		when(this.colisService.getAllColis()).thenReturn(null);

		this.mockMvc.perform(get("/api/coli")).andExpect(status().isNotFound());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void createColis() throws Exception {
		when(this.colisService.createNewColis((Colis) any())).thenReturn(new Colis(7, new Date(), new User("test", "password", new Role("ROLE_TEST"))));

		this.mockMvc.perform(post("/api/colis").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content("{\"nbreColis\": 7, \"user\": {\"username\": \"test\", \"password\": \"password\", \"role\": {\"role\": \"ROLE_TEST\"}}}"))
					.andExpect(status().isOk())
					.andExpect(jsonPath("nbreColis").value(7))
					.andExpect(jsonPath("user.username").value("test"))
					.andExpect(jsonPath("user.role.role").value("ROLE_TEST"));
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void createColisFail() throws Exception {
		when(this.colisService.createNewColis((Colis) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/colis").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void updateColis() throws Exception {
		when(this.colisService.updateColis((Colis) any())).thenReturn(new Colis(7, new Date(), new User("test", "password", new Role("ROLE_TEST"))));

		this.mockMvc.perform(put("/api/colis").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content("{\"nbreColis\": 7, \"user\": {\"username\": \"test\", \"password\": \"password\", \"role\": {\"role\": \"ROLE_TEST\"}}}"))
					.andExpect(status().isOk())
					.andExpect(jsonPath("nbreColis").value(7))
					.andExpect(jsonPath("user.username").value("test"))
					.andExpect(jsonPath("user.role.role").value("ROLE_TEST"));
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void updateColisFail() throws Exception {
		when(this.colisService.updateColis((Colis) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/colis").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void deleteColis() throws Exception {
		
		doNothing().when(this.colisService).deleteColis(3L);;

		this.mockMvc.perform(delete("/api/colis/3"))
				.andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void deleteColisNotFound() throws Exception {

		this.mockMvc.perform(delete("/api/coli/2"))
				.andExpect(status().isNotFound());
	}

}
