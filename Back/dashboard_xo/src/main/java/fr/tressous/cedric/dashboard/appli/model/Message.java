package fr.tressous.cedric.dashboard.appli.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="messages")
public class Message {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String texte;
	private Date date;
	private String destinataire;
	
	@ManyToOne
	@JoinColumn(name="idUser")
	private User user;
	
		
	public Message() {
	}

	public Message(String texte, Date date, String destinataire, User user) {
		this.texte = texte;
		this.date = date;
		this.destinataire = destinataire;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTexte() {
		return texte;
	}

	public void setTexte(String texte) {
		this.texte = texte;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDestinataire() {
		return destinataire;
	}

	public void setDestinataire(String destinataire) {
		this.destinataire = destinataire;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}	
}
