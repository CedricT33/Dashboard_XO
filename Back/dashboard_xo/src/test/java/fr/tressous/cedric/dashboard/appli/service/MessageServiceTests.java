package fr.tressous.cedric.dashboard.appli.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import fr.tressous.cedric.dashboard.appli.model.Message;
import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.repository.MessageRepository;

@RunWith(MockitoJUnitRunner.class)
public class MessageServiceTests {

	@Mock
	MessageRepository messageRepo;
	
	private MessageService messageService;

	@Before
	public void setUp() throws Exception {
		messageService = new MessageServiceImpl(messageRepo);
	}
	
	@Test
	public void getAllMessages() {
		given(messageRepo.findAll()).willReturn(new ArrayList<Message>());

		List<Message> messages = messageService.getAllMessages();

		assertThat(messages).isNotNull();
	}
	
	@Test
	public void getAllMessagesNotFound() {
		given(messageRepo.findAll()).willReturn(null);

		List<Message> messages = messageService.getAllMessages();

		assertThat(messages).isNull();
	}
	
	@Test
	public void createNewMessage() {
		Message message = new Message("Texte test", new Date(), "LOGISTIQUE", new User("test", "password", new Role("ROLE_TEST")));
		given(messageRepo.save(message)).willReturn(message);

		Message savedMessage = messageService.createNewMessage(message);

		assertThat(savedMessage.getTexte()).isEqualTo("Texte test");
		assertThat(savedMessage.getUser().getRole().getRole()).isEqualTo("ROLE_TEST");
	}
	
	@Test
	public void createNewMessageFailed() {
		Message message = new Message("Texte test", new Date(), "LOGISTIQUE", new User("test", "password", new Role("ROLE_TEST")));
		given(messageRepo.save(message)).willReturn(null);

		Message savedMessage = messageService.createNewMessage(message);

		assertThat(savedMessage).isNull();
	}
	
	@Test
	public void updateMessage() {
		Message message = new Message("Texte test", new Date(), "LOGISTIQUE", new User("test", "password", new Role("ROLE_TEST")));
		given(messageRepo.saveAndFlush(message)).willReturn(message);

		Message savedMessage = messageService.updateMessage(message);

		assertThat(savedMessage.getTexte()).isEqualTo("Texte test");
		assertThat(savedMessage.getUser().getRole().getRole()).isEqualTo("ROLE_TEST");
	}
	
	@Test
	public void updateMessageFail() {
		Message message = new Message("Texte test", new Date(), "LOGISTIQUE", new User("test", "password", new Role("ROLE_TEST")));
		given(messageRepo.saveAndFlush(message)).willReturn(null);

		Message savedMessage = messageService.updateMessage(message);

		assertThat(savedMessage).isNull();
	}

}
