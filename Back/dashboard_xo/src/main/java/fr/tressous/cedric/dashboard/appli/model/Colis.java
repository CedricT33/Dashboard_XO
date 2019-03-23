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
@Table(name="colisExpedies")
public class Colis {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idColis;
	
	private int nbreColis;
	
	private Date date;
	
	@ManyToOne
	@JoinColumn(name="idUser")
	private User user;
			
	public Colis() {
	}

	public Long getIdColis() {
		return idColis;
	}

	public void setIdColis(Long idColis) {
		this.idColis = idColis;
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
