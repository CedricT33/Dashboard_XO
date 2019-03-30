package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.exception.ExistingUsernameException;
import fr.tressous.cedric.dashboard.exception.InvalidCredentialsException;

@Service
public interface UserService {
	
	/**
     * Method that signs a user in the application.
     * @param username the user username.
     * @param password the user password.
     * @return the JWT if credentials are valid, throws InvalidCredentialsException otherwise.
     * @throws InvalidCredentialsException
     */
    public String signin(String username, String password) throws InvalidCredentialsException;

    /**
     * Method that signs up a new user in the application.
     * @param user the new user to create.
     * @return the JWT if user username is not already existing.
     * @throws ExistingUsernameException
     */
    public String signup(User user) throws ExistingUsernameException;
	
	/**
	 * Method that return a list of users in the application.
	 * @return the list of users.
	 */
	public List<User> getAllUsers();
	
	/**
	 * Method that return a user in the application.
	 * @return eventually a user.
	 */
	public Optional<User> findUserByUserName(String username);
	
	/**
     * Method that creates a new user.
     * @param newUser the new user to create.
     * @return the created user.
     */
    public User createNewUser(User newUser);
    
    /**
     * Method that update a user.
     * @param user the user to update.
     * @return the updated user.
     */
    public User updateUser(User user);
    
    /**
     * Method that delete a user.
     * @param id the id of the user to delete.
     */
    public void deleteUser(Long id);
}
