package fr.tressous.cedric.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import fr.tressous.cedric.dashboard.appli.model.Role;
import fr.tressous.cedric.dashboard.appli.model.User;
import fr.tressous.cedric.dashboard.appli.service.RoleService;
import fr.tressous.cedric.dashboard.appli.service.UserService;

@SpringBootApplication
public class Application implements CommandLineRunner{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleService roleService;
	
	public static void main(String[] args)  {
        SpringApplication.run(Application.class, args);
    }
	
	/**
     * Init method that loads some data in the H2 database.
     * @param params
     * @throws Exception
     */
	public void run(String... args) throws Exception {
		
		// creation of the user admin, and authorities if the table users is empty.
		if (userService.getAllUsers().isEmpty()) {
			Role roleAdmin = new Role();
			roleAdmin.setRole("ROLE_ADMIN");
			roleService.createNewRole(roleAdmin);
			Role roleLog = new Role();
			roleLog.setRole("ROLE_LOGISTIQUE");
			roleService.createNewRole(roleLog);
			Role roleCom = new Role();
			roleCom.setRole("ROLE_COMMERCIAL");
			roleService.createNewRole(roleCom);
			Role roleFin = new Role();
			roleFin.setRole("ROLE_FINANCE");
			roleService.createNewRole(roleFin);
			Role roleDir = new Role();
			roleDir.setRole("ROLE_DIRECTION");
			roleService.createNewRole(roleDir);
			
			User admin = new User();
			admin.setUsername("admin");
			admin.setPassword("simplon");
			admin.setRole(roleAdmin);
			userService.createNewUser(admin);
		}		
	}
}
