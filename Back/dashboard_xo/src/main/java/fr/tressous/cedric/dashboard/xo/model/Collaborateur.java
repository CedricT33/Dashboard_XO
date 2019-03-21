package fr.tressous.cedric.dashboard.xo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

@Entity
@Table(name="f_collaborateur")
public class Collaborateur implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="cbmarq")
	private int id;
	
	@Column(name="CO_Nom")
	private String nom;
	
	@Column(name="CO_Prenom")
	private String prenom;
	
	@NaturalId
	@Column(name="CO_No")
	private int numero;

	public int getId() {
		return id;
	}

	public String getNom() {
		return nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public int getNumero() {
		return numero;
	}	
}
