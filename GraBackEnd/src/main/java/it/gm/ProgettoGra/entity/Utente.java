package it.gm.ProgettoGra.entity;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "utenti")
public class Utente {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "nomeUtente")
	private String nomeUtente;
	
	@Column(name = "password")
	private String password;
	
	@Column(name= "dataCreazione")
	private LocalDate dataCreazione;
	
	@Column(name= "abilitato")
	private boolean abilitato = false;
	
	@ManyToOne
	@JoinColumn(name = "idProfiloUtente")
	private ProfiloUtente idProfiloUtente;
	
	
	public Utente() {
		
	}
	
	public Utente(long _id, String _nomeUtente, String _password, boolean _abilitato, ProfiloUtente _profiloUtenteId, LocalDate _dataCreazione) {
		
		this.id = _id;
		this.nomeUtente =_nomeUtente;
		this.password = _password;
		this.idProfiloUtente = _profiloUtenteId;
		this.dataCreazione = _dataCreazione;
		this.abilitato = _abilitato;
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNomeUtente() {
		return nomeUtente;
	}

	public void setNomeUtente(String nomeUtente) {
		this.nomeUtente = nomeUtente;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ProfiloUtente getProfiloUtenteId() {
		return idProfiloUtente;
	}
	
	public LocalDate getDataCreazione() {
		
		return dataCreazione;
	}

	public void setDataCreazione(LocalDate _dataCreazione) {
		
		this.dataCreazione = _dataCreazione;
		
	}
	public void setProfiloUtenteId(ProfiloUtente profiloUtenteId) {
		this.idProfiloUtente = profiloUtenteId;
	}
	
	public boolean getAbilitato() {
		
		return this.abilitato;
		
	}
	
	public void setAbilitato(boolean abilitato){
		
		this.abilitato = abilitato;
	}

	@Override
	public String toString() {
		return "Utente [id=" + id + ", nomeUtente=" + nomeUtente + ", password=" + password + ", dataCreazione=" + dataCreazione + ", idProfiloUtente="
				+ idProfiloUtente + "abilitato= " + abilitato;
	}

}
