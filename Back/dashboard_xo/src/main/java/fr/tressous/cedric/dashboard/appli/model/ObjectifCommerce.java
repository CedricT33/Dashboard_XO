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
@Table(name="objectifsCommerce")
public class ObjectifCommerce {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idObjectif;
	private String intitule;
	private Date date;
	private int chiffre;
	
	@ManyToOne
	@JoinColumn(name="idUser")
	private User user;
	
	
	public ObjectifCommerce() {
	}

	public Long getIdObjectif() {
		return idObjectif;
	}

	public void setIdObjectif(Long idObjectif) {
		this.idObjectif = idObjectif;
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
