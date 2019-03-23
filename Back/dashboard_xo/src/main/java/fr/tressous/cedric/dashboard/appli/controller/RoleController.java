package fr.tressous.cedric.dashboard.appli.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.service.RoleService;

@RestController
@RequestMapping("/api/role")
public class RoleController {
	
	@Autowired
	private RoleService roleService;
	
	/**
	 * Method that send a list of authorities out of the application.
	 * @return the list of authorities.
	 */
	@GetMapping
	public List<Role> getRoles() {
		return roleService.getAllRoles();
	}
}
