package fr.tressous.cedric.dashboard.appli.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.appli.model.Message;
import fr.tressous.cedric.dashboard.appli.service.MessageService;

@RestController
@RequestMapping("/api/message")
@CrossOrigin("*")
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
	/**
	 * Method that send a list of messages out of the application.
	 * @return the list of messages.
	 */
	@GetMapping
	public List<Message> getMessages() {
		return messageService.getAllMessages();
	}
	
	/**
	 * Method that send a message into the database of the application.
	 * @return the message.
	 */
	@PostMapping
	public ResponseEntity<Message> createMessage(@RequestBody Message newMessage) {
		return ResponseEntity.ok(messageService.createNewMessage(newMessage));
	}
	
	/**
	 * Method that update a message from the database of the application.
	 * @param message the message to update.
	 * @return the message.
	 */
	@PutMapping
	public ResponseEntity<Message> updateMessage(@RequestBody Message message) {
		return ResponseEntity.ok(messageService.updateMessage(message));
	}
	
	/**
	 * Method that delete a message from the database of the application.
	 * @param id the id of the message to delete.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
		messageService.deleteMessage(id);
		return ResponseEntity.ok(null);
	}
}
