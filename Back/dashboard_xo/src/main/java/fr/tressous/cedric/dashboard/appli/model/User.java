package fr.tressous.cedric.dashboard.appli.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String username;
	
	private String password;
	
	@ManyToOne
	@JoinColumn(name="idRole")
	private Role role;
	
	@OneToMany(mappedBy="user", cascade= CascadeType.REMOVE)
	@JsonIgnore
	private List<Message> messages;
	
	@OneToMany(mappedBy="user", cascade= CascadeType.REMOVE)
	@JsonIgnore
	private List<ObjectifCommerce> objectifs;
	
	@OneToMany(mappedBy="user", cascade= CascadeType.REMOVE)
	@JsonIgnore
	private List<Colis> colis;
	
		
	public User() {
	}

	public User(String username, String password, Role role) {
		this.username = username;
		this.password = password;
		this.role = role;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public List<ObjectifCommerce> getObjectifs() {
		return objectifs;
	}

	public void setObjectifs(List<ObjectifCommerce> objectifs) {
		this.objectifs = objectifs;
	}

	public List<Colis> getColis() {
		return colis;
	}

	public void setColis(List<Colis> colis) {
		this.colis = colis;
	}
	
}
