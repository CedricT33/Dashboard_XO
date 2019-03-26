package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	private UserRepository userRepo;
	
	public UserServiceImpl(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	public List<User> getAllUsers() {
		return userRepo.findAll();
	}
	
	public User createNewUser(User newUser) {
		return userRepo.save(newUser);
	}
	
	public User updateUser(User user) {
		return userRepo.saveAndFlush(user);
	}
	
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	}
}
