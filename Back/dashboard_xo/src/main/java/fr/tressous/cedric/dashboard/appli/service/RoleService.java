package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.Role;

@Service
public interface RoleService {
	
	/**
	 * Method that return a list of authorities in the application.
	 * @return the list of authorities.
	 */
	public List<Role> getAllRoles();
	
	/**
     * Method that creates a new authority.
     * @param newUser the new authority to create.
     * @return the created authority.
     */
    public Role createNewRole(Role newRole);
}
