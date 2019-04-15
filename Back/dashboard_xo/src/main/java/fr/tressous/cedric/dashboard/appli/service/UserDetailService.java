package fr.tressous.cedric.dashboard.appli.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.repository.UserRepository;

import java.util.Optional;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final Optional<fr.tressous.cedric.dashboard.appli.model.User> user = userRepo.findByUsername(username);

        if (!user.isPresent()) {
            throw new UsernameNotFoundException("AppUser '" + username + "' not found");
        }

        return User
                .withUsername(username)
                .password(user.get().getPassword())
                .authorities(user.get().getRole().getRole())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
