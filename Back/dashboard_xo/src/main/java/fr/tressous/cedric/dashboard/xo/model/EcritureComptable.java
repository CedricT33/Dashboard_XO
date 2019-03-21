package fr.tressous.cedric.dashboard.xo.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="f_ecriturec")
public class EcritureComptable {
	
	@Id
	@Column(name="cbmarq")
	private int id;
	
	@Column(name="EC_echeance")
	private Date echeance;
	
	@Column(name="EC_montant")
	private Double montant;
	
	@Column(name="EC_sens")
	private int sens;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="CT_Num", referencedColumnName = "CT_Num")
	private CompteTiers compteT;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="CG_Num", referencedColumnName = "CG_Num")
	private CompteGeneral compteG;

	public int getId() {
		return id;
	}

	public Date getEcheance() {
		return echeance;
	}

	public Double getMontant() {
		return montant;
	}

	public int getSens() {
		return sens;
	}

	public CompteTiers getCompteT() {
		return compteT;
	}

	public CompteGeneral getCompteG() {
		return compteG;
	}
}
