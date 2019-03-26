package fr.tressous.cedric.dashboard.xo.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import fr.tressous.cedric.dashboard.xo.model.DocLigne;
import fr.tressous.cedric.dashboard.appli.service.ColisService;
import fr.tressous.cedric.dashboard.appli.service.MessageService;
import fr.tressous.cedric.dashboard.appli.service.ObjectifCommerceService;
import fr.tressous.cedric.dashboard.appli.service.RoleService;
import fr.tressous.cedric.dashboard.appli.service.UserService;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RunWith(SpringRunner.class)
@WebMvcTest
public class DocLigneControllerTests {

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
	public void getDocLignes() throws Exception {
		when(this.xoService.getAllDocLignes()).thenReturn(new ArrayList<DocLigne>());

		this.mockMvc.perform(get("/api/docligne")).andExpect(status().isOk());
	}
	
	@Test
	public void getDocLignesNotFound() throws Exception {
		when(this.xoService.getAllDocLignes()).thenReturn(null);

		this.mockMvc.perform(get("/api/doclignes")).andExpect(status().isNotFound());
	}
}

