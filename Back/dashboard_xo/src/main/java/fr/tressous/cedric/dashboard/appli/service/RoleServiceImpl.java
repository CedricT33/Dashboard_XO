package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService{
	
	private RoleRepository roleRepo;
	
	public RoleServiceImpl(RoleRepository roleRepo) {
		this.roleRepo = roleRepo;
	}

	public List<Role> getAllRoles() {
		return roleRepo.findAll();
	}
	
	public Role createNewRole(Role newrole) {
		return roleRepo.save(newrole);
	}
}
