package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.User;

@Service
public interface UserService {
	
	/**
	 * Method that return a list of users in the application.
	 * @return the list of users.
	 */
	public List<User> getAllUsers();
	
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
