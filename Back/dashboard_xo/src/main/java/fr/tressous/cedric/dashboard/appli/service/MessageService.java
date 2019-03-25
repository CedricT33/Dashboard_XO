package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.Message;

@Service
public interface MessageService {
	
	/**
	 * Method that return a list of messages in the application.
	 * @return the list of messages.
	 */
	public List<Message> getAllMessages();
	
	/**
     * Method that creates a new message.
     * @param newMessage the new message to create.
     * @return the created message.
     */
    public Message createNewMessage(Message newMessage);
    
    /**
     * Method that update a new message.
     * @param message the message to message.
     * @return the updated message.
     */
    public Message updateMessage(Message message);
    
    /**
     * Method that delete a message.
     * @param id the id of the message to delete.
     */
    public void deleteMessage(Long id);
}
