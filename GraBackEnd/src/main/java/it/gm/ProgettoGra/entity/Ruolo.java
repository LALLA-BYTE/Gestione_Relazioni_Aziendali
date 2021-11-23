package it.gm.ProgettoGra.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="ruoli")
public class Ruolo {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name="nomeRuolo")
	private String nomeRuolo;
	
	@Column(name="dataCreazione")
	private String dataCreazione;

	
	public Ruolo() {
		
	}
	
	public Ruolo(long id, String nomeRuolo, String dataCreazione) {
		super();
		this.id = id;
		this.nomeRuolo = nomeRuolo;
		this.dataCreazione = dataCreazione;
	}
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNomeRuolo() {
		return nomeRuolo;
	}
	public void setNomeRuolo(String nomeRuolo) {
		this.nomeRuolo = nomeRuolo;
	}
	public String getDataCreazione() {
		return dataCreazione;
	}
	public void setDataCreazione(String dataCreazione) {
		this.dataCreazione = dataCreazione;
	}
	
	
	@Override
	public String toString() {
		return "Ruolo [id=" + id + ", nomeRuolo=" + nomeRuolo + ", dataCreazione=" + dataCreazione + "]";
	}
	

}
