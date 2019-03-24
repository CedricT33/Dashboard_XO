package fr.tressous.cedric.dashboard.xo.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="f_docentete")
public class DocEntete {
	
	@Id
	@Column(name="cbmarq")
	private int id;
	
	@Column(name="DO_piece")
	private String piece;
	
	@Column(name="DO_date")
	private Date date;
	
	@Column(name="DO_totalht")
	private Double totalHT;
	
	@ManyToOne
	@JoinColumn(name="CO_No", referencedColumnName = "CO_No")
	private Collaborateur collaborateur;
	
	@ManyToOne
	@JoinColumn(name="CT_Numpayeur", referencedColumnName = "CT_Numpayeur")
	private CompteTiers compteT;

	public int getId() {
		return id;
	}

	public String getPiece() {
		return piece;
	}

	public Date getDate() {
		return date;
	}

	public Double getTotalHT() {
		return totalHT;
	}

	public Collaborateur getCollaborateur() {
		return collaborateur;
	}

	public CompteTiers getCompteT() {
		return compteT;
	}
	
}
