package fr.tressous.cedric.dashboard.xo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

@Entity
@Table(name="f_comptet")
public class CompteTiers implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="cbmarq")
	private int id;
	
	@Column(name="CT_Intitule")
	private String intitule;
	
	@Column(name="CT_Adresse")
	private String adresse;
	
	@Column(name="CT_Codepostal")
	private String codePostal;
	
	@Column(name="CT_Ville")
	private String ville;
	
	@Column(name="CT_Pays")
	private String pays;
	
	@NaturalId
	@Column(name="CT_Numpayeur")
	private String numeroPayeur;
	
	@NaturalId
	@Column(name="CT_Num")
	private String numero;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="CG_NumPrinc", referencedColumnName = "CG_Num")
	private CompteGeneral compteG;

	public int getId() {
		return id;
	}

	public String getIntitule() {
		return intitule;
	}

	public String getNumeroPayeur() {
		return numeroPayeur;
	}

	public String getNumero() {
		return numero;
	}

	public String getAdresse() {
		return adresse;
	}

	public String getCodePostal() {
		return codePostal;
	}

	public String getVille() {
		return ville;
	}

	public String getPays() {
		return pays;
	}

	public CompteGeneral getCompteG() {
		return compteG;
	}
}
