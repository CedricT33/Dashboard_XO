package fr.tressous.cedric.dashboard.xo.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

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

	public Date getDateBC() throws ParseException {
		// conversion to UTC
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"); 
	    df.setTimeZone(TimeZone.getTimeZone("UTC"));
	    String toParse = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(dateBC);
	    Date dateToGet = df.parse(toParse);
		return dateToGet;
	}

	public Date getDateBL() throws ParseException {
		// conversion to UTC
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"); 
	    df.setTimeZone(TimeZone.getTimeZone("UTC"));
	    String toParse = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(dateBL);
	    Date dateToGet = df.parse(toParse);
		return dateToGet;
	}

	public Collaborateur getCollaborateur() {
		return collaborateur;
	}

	public CompteTiers getCompteT() {
		return compteT;
	}	
}
