package fr.tressous.cedric.dashboard.xo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

@Entity
@Table(name="f_compteg")
public class CompteGeneral implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="cbmarq")
	private int id;
	
	@Column(name="CG_Intitule")
	private String intitule;
	
	@NaturalId
	@Column(name="CG_Num")
	private String numero;

	public int getId() {
		return id;
	}

	public String getIntitule() {
		return intitule;
	}

	public String getNumero() {
		return numero;
	}
}
