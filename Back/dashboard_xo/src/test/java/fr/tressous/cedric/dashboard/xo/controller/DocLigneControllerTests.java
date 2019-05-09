package fr.tressous.cedric.dashboard.xo.controller;

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

import fr.tressous.cedric.dashboard.xo.model.DocLigne;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class DocLigneControllerTests {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	XoService xoService;
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getDocLignes() throws Exception {
		when(this.xoService.getAllDocLignes()).thenReturn(new ArrayList<DocLigne>());

		this.mockMvc.perform(get("/api/docligne")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getDocLignesNotFound() throws Exception {
		when(this.xoService.getAllDocLignes()).thenReturn(null);

		this.mockMvc.perform(get("/api/doclignes")).andExpect(status().isNotFound());
	}
}

