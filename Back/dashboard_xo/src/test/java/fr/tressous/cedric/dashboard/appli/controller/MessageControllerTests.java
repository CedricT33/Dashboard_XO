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

import fr.tressous.cedric.dashboard.appli.model.Message;
import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.service.MessageService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class MessageControllerTests {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	MessageService messageService;

	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getMessages() throws Exception {
		when(this.messageService.getAllMessages()).thenReturn(new ArrayList<Message>());

		this.mockMvc.perform(get("/api/message")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getMessagesNotFound() throws Exception {
		when(this.messageService.getAllMessages()).thenReturn(null);

		this.mockMvc.perform(get("/api/messag")).andExpect(status().isNotFound());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void createMessage() throws Exception {
		when(this.messageService.createNewMessage((Message) any())).thenReturn(new Message("Texte test", new Date(), "LOGISTIQUE", new User("test", "password", new Role("ROLE_TEST"))));

		this.mockMvc.perform(post("/api/message").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content("{\"texte\": \"Texte test\", \"user\": {\"username\": \"test\", \"password\": \"password\", \"role\": {\"role\": \"ROLE_TEST\"}}}"))
					.andExpect(status().isOk())
					.andExpect(jsonPath("texte").value("Texte test"))
					.andExpect(jsonPath("user.username").value("test"))
					.andExpect(jsonPath("user.role.role").value("ROLE_TEST"));
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void createMessageFail() throws Exception {
		when(this.messageService.createNewMessage((Message) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/message").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void updateMessage() throws Exception {
		when(this.messageService.updateMessage((Message) any())).thenReturn(new Message("Texte test", new Date(), "LOGISTIQUE", new User("test", "password", new Role("ROLE_TEST"))));

		this.mockMvc.perform(put("/api/message").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content("{\"texte\": \"Texte test\", \"user\": {\"username\": \"test\", \"password\": \"password\", \"role\": {\"role\": \"ROLE_TEST\"}}}"))
					.andExpect(status().isOk())
					.andExpect(jsonPath("texte").value("Texte test"))
					.andExpect(jsonPath("user.username").value("test"))
					.andExpect(jsonPath("user.role.role").value("ROLE_TEST"));
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void updateMessageFail() throws Exception {
		when(this.messageService.updateMessage((Message) any())).thenReturn(null);

		this.mockMvc.perform(post("/api/messag").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(""))
					.andReturn();
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void deleteMessage() throws Exception {
		
		doNothing().when(this.messageService).deleteMessage(3L);

		this.mockMvc.perform(delete("/api/message/3"))
				.andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void deleteMessageNotFound() throws Exception {

		this.mockMvc.perform(delete("/api/messag/2"))
				.andExpect(status().isNotFound());
	}

}
