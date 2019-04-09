package fr.tressous.cedric.dashboard.appli.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.appli.dto.JsonWebToken;
import fr.tressous.cedric.dashboard.appli.dto.UserDto;
import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.service.UserService;
import fr.tressous.cedric.dashboard.exception.ExistingUsernameException;
import fr.tressous.cedric.dashboard.exception.InvalidCredentialsException;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	/**
     * Method to register a new user in database.
     * @param user the new user to create.
     * @return a JWT if sign up is OK, a bad response code otherwise.
     */
    @PostMapping("/sign-up")
    public ResponseEntity<JsonWebToken> signUp(@RequestBody User user) {
        try {
            return ResponseEntity.ok(new JsonWebToken(userService.signup(user)));
        } catch (ExistingUsernameException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Method to sign in a user (already existing).
     * @param user the user to sign in to the application.
     * @return a JWT if sign in is OK, a bad response code otherwise.
     */
    @PostMapping("/sign-in")
    public ResponseEntity<JsonWebToken> signIn(@RequestBody User user) {
        try {
            return ResponseEntity.ok(new JsonWebToken(userService.signin(user.getUsername(), user.getPassword())));
        } catch (InvalidCredentialsException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
	
	/**
	 * Method that send a list of users out of the application.
	 * This method is restricted to Admin users.
	 * @return the list of all users registered in the database without password.
	 */
	@GetMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public List<UserDto> getUsers() {
		return userService.getAllUsers().stream().map(user -> new UserDto(user.getId(), user.getUsername(), user.getRole())).collect(Collectors.toList());
	}
	
	/**
	 * Method that send a user into the database of the application.
	 * This method is restricted to Admin users.
	 * @param newUser the user to add.
	 * @return the user.
	 */
	@PostMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> createUser(@RequestBody User newUser) {
		// cryptage mot de passe avant sauvegarde dans BDD
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		newUser.setPassword(bcrypt.encode(newUser.getPassword()));
		return ResponseEntity.ok(userService.createNewUser(newUser));
	}
	
	/**
	 * Method that update a user from the database of the application.
	 * This method is restricted to Admin users.
	 * @param user the user to update.
	 * @return the user.
	 */
	@PutMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		return ResponseEntity.ok(userService.updateUser(user));
	}
	
	/**
	 * Method that delete a user from the database of the application.
	 * This method is restricted to Admin users.
	 * @param id the id of the user to delete.
	 */
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return ResponseEntity.ok(null);
	}

}
