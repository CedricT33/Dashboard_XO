package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.Message;
import fr.tressous.cedric.dashboard.appli.repository.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService{
	
	@Autowired
	private MessageRepository messageRepo;
	
	public List<Message> getAllMessages() {
		return messageRepo.findAll();
	}
	
	public Message createNewMessage(Message newMessage) {
		return messageRepo.save(newMessage);
	}
	
	public Message updateMessage(Message message) {
		return messageRepo.save(message);
	}
	
	public void deleteMessage(Long id) {
		messageRepo.deleteById(id);
	}
}
