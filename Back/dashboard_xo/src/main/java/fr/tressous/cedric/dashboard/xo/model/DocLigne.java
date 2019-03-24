package fr.tressous.cedric.dashboard.xo.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="f_docligne")
public class DocLigne {
	
	@Id
	@Column(name="cbmarq")
	private int id;
	
	@Column(name="DL_montantht")
	private Double montantHT;
	
	@Column(name="DL_datebc")
	private Date dateBC;
	
	@Column(name="DL_datebl")
	private Date dateBL;
	
	@ManyToOne
	@JoinColumn(name="CO_No", referencedColumnName = "CO_No")
	private Collaborateur collaborateur;
	
	@ManyToOne
	@JoinColumn(name="CT_Num", referencedColumnName = "CT_Num")
	private CompteTiers compteT;

	public int getId() {
		return id;
	}

	public Double getMontantHT() {
		return montantHT;
	}

	public Date getDateBC() {
		return dateBC;
	}

	public Date getDateBL() {
		return dateBL;
	}

	public Collaborateur getCollaborateur() {
		return collaborateur;
	}

	public CompteTiers getCompteT() {
		return compteT;
	}	
}
