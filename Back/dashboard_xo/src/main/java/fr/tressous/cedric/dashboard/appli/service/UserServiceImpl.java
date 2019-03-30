package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.repository.UserRepository;
import fr.tressous.cedric.dashboard.exception.ExistingUsernameException;
import fr.tressous.cedric.dashboard.exception.InvalidCredentialsException;
import fr.tressous.cedric.dashboard.security.JwtTokenProvider;

@Service
public class UserServiceImpl implements UserService{
	
	private UserRepository userRepo;
	private BCryptPasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private AuthenticationManager authenticationManager;
	
	public UserServiceImpl(UserRepository userRepo, BCryptPasswordEncoder passwordEncoder,
            				JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
	}
	
	public String signin(String username, String password) throws InvalidCredentialsException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return jwtTokenProvider.createToken(username, userRepo.findByUsername(username).get().getRole().getRole());
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException();
        }
    }

    public String signup(User user) throws ExistingUsernameException {
        if (!userRepo.existsByUsername(user.getUsername())) {
            User userToSave = new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getRole());
            userRepo.save(userToSave);
            return jwtTokenProvider.createToken(user.getUsername(), user.getRole().getRole());
        } else {
            throw new ExistingUsernameException();
        }
    }

	public List<User> getAllUsers() {
		return userRepo.findAll();
	}
	
	public Optional<User> findUserByUserName(String username) {
        return userRepo.findByUsername(username);
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
