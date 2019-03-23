package fr.tressous.cedric.dashboard.appli.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	/**
	 * Method that send a list of users out of the application.
	 * @return the list of users.
	 */
	@GetMapping
	public List<User> getUsers() {
		return userService.getAllUsers();
	}
	
	/**
	 * Method that send a user into the database of the application.
	 * @param newUser the user to add.
	 * @return the user.
	 */
	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User newUser) {
		return ResponseEntity.ok(userService.createNewUser(newUser));
	}
	
	/**
	 * Method that update a user from the database of the application.
	 * @param user the user to update.
	 * @return the user.
	 */
	@PutMapping
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		return ResponseEntity.ok(userService.updateUser(user));
	}
	
	/**
	 * Method that delete a user from the database of the application.
	 * @param user the user to delete.
	 */
	@DeleteMapping
	public ResponseEntity<?> deleteUser(@RequestBody User user) {
		userService.deleteUser(user);
		return ResponseEntity.ok(null);
	}

}
