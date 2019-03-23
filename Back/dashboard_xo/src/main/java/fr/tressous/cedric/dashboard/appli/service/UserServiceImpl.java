package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepo;
	
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}
	
	public User createNewUser(User newUser) {
		return userRepo.save(newUser);
	}
	
	public User updateUser(User user) {
		return userRepo.saveAndFlush(user);
	}
	
	public void deleteUser(User user) {
		userRepo.delete(user);
	}
}
