package it.gm.ProgettoGra.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="profiliUtente")
public class ProfiloUtente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "nomeProfilo")
	private String nomeProfilo;

	public ProfiloUtente() {
		
	}

	public ProfiloUtente(long id, String nomeProfilo) {
		super();
		this.id = id;
		this.nomeProfilo = nomeProfilo;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNomeProfilo() {
		return nomeProfilo;
	}

	public void setNomeProfilo(String nomeProfilo) {
		this.nomeProfilo = nomeProfilo;
	}

	@Override
	public String toString() {
		return "ProfiloUtente [id=" + id + ", nomeProfilo=" + nomeProfilo + "]";
	}
	
}
