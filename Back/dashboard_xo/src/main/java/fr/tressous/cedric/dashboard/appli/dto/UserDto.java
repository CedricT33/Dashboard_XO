package fr.tressous.cedric.dashboard.appli.dto;

import fr.tressous.cedric.dashboard.appli.model.Role;

/**
 * Specific App User DTO to be able to send user data without password through REST responses.
 */
public class UserDto {

    private Long id;

    private String username;

    private Role role;

    public UserDto(Long id, String username, Role role) {
    	this.id = id;
        this.username = username;
        this.role = role;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
    
}
