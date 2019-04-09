package fr.tressous.cedric.dashboard.appli.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="colisExpedies")
public class Colis {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private int nbreColis;
	
	private Date date;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idUser")
	private User user;
			
	public Colis() {
	}

	public Colis(int nbreColis, Date date, User user) {
		this.nbreColis = nbreColis;
		this.date = date;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getNbreColis() {
		return nbreColis;
	}

	public void setNbreColis(int nbreColis) {
		this.nbreColis = nbreColis;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
