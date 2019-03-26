package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.Message;
import fr.tressous.cedric.dashboard.appli.repository.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService{
	
	private MessageRepository messageRepo;
	
	public MessageServiceImpl(MessageRepository messageRepo) {
		this.messageRepo = messageRepo;
	}

	public List<Message> getAllMessages() {
		return messageRepo.findAll();
	}
	
	public Message createNewMessage(Message newMessage) {
		return messageRepo.save(newMessage);
	}
	
	public Message updateMessage(Message message) {
		return messageRepo.saveAndFlush(message);
	}
	
	public void deleteMessage(Long id) {
		messageRepo.deleteById(id);
	}
}
