package it.gm.ProgettoGra.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "dipendenti")
public class Dipendente {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "nome")
	private String nome;
	
	@Column(name = "cognome")
	private String cognome;
	
	@Column(name = "dataNascita")
	private String dataNascita;
	
	@Column(name = "dataAssunzione")
	private String dataAssunzione;
	
	@Column(name = "reparto")
	private String reparto;
	
	@Column(name = "ferieGodute")
	private int ferieGodute;
	
	@Column(name = "ferieRimanenti")
	private int ferieRimanenti;
	
	@ManyToOne
	@JoinColumn(name = "idRuolo")
	private Ruolo idRuolo;

	public Dipendente() {

	}

	public Dipendente(String nome, String cognome, String dataAssunzione, String dataNascita, String reparto, Ruolo idRuolo, int ferieGodute, int ferieRimanenti) {
		super();
		this.nome = nome;
		this.cognome = cognome;
		this.dataAssunzione = dataAssunzione;
		this.dataNascita = dataNascita;
		this.reparto = reparto;
		this.idRuolo = idRuolo;
		this.ferieGodute = ferieGodute;
		this.ferieRimanenti = ferieRimanenti;
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public String getDataNascita() {
		return dataNascita;
	}

	public void setDataNascita(String dataNascita) {
		this.dataNascita = dataNascita;
	}

	public String getDataAssunzione() {
		return dataAssunzione;
	}

	public void setDataAssunzione(String dataAssunzione) {
		this.dataAssunzione = dataAssunzione;
	}

	public String getReparto() {

		return reparto;
	}

	public void setReparto(String reparto) {

		this.reparto = reparto;

	}

	public Ruolo getIdRuolo() {
		return idRuolo;
	}

	public void setIdRuolo(Ruolo idRuolo) {
		this.idRuolo = idRuolo;
	}

	
	public int getFerieGodute() {
		
		return ferieGodute;
	}
	
	public void setFerieGodute(int ferieGodute){
		
		this.ferieGodute = ferieGodute;
	}
	
	public int getFerieRimanenti() {
		return ferieRimanenti;
	}
	
	public void setFerieRimanenti(int ferieRimanenti) {
		
		this.ferieRimanenti = ferieRimanenti;
	}
	
	@Override
	public String toString() {
		return "Dipendente [id=" + id + ", nome=" + nome + ", cognome=" + cognome + ", dataNascita=" + dataNascita
				+ ", dataAssunzione=" + dataAssunzione + ", reparto=" + reparto + ", idRuolo=" + idRuolo + "]";
	}
	
}
