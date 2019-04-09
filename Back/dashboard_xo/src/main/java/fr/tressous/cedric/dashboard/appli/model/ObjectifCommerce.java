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
@Table(name="objectifsCommerce")
public class ObjectifCommerce {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String intitule;
	private Date date;
	private int chiffre;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idUser")
	private User user;
	
	
	public ObjectifCommerce() {
	}

	public ObjectifCommerce(String intitule, Date date, int chiffre, User user) {
		this.intitule = intitule;
		this.date = date;
		this.chiffre = chiffre;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIntitule() {
		return intitule;
	}

	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getChiffre() {
		return chiffre;
	}

	public void setChiffre(int chiffre) {
		this.chiffre = chiffre;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
