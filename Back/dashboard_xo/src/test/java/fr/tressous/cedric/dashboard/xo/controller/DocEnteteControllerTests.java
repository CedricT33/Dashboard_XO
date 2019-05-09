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

import fr.tressous.cedric.dashboard.xo.model.DocEntete;
import fr.tressous.cedric.dashboard.xo.service.XoService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class DocEnteteControllerTests {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	XoService xoService;
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getDocEntetes() throws Exception {
		when(this.xoService.getAllDocEntetes()).thenReturn(new ArrayList<DocEntete>());

		this.mockMvc.perform(get("/api/docentete")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getDocEntetesNotFound() throws Exception {
		when(this.xoService.getAllDocEntetes()).thenReturn(null);

		this.mockMvc.perform(get("/api/docentet")).andExpect(status().isNotFound());
	}
}

