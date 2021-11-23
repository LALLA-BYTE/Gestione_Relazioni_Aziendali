package it.gm.ProgettoGra.service;

import java.time.LocalDate;
import java.util.List;
import it.gm.ProgettoGra.entity.Utente;

public interface UtenteService {

	
	List<Utente> findByNomeUtente(String nomeUtente);

	List<Utente> findByPassword(String password);

	List<Utente> findByDataCreazione(LocalDate dataCreazione);

	List<Utente> findByPasswordAndDataCreazione(String password, LocalDate dataCreazione);

	List<Utente> findByNomeUtenteAndDataCreazione(String nomeUtente, LocalDate dataCreazione);

	List<Utente> searchByNomeUtenteAndPassword(String nomeUtente, String password);

	Utente findByNomeUtenteAndPassword(String nomeUtente, String password);
	
	Utente searchByNomeUtente(String nomeUtente);

	Utente validate(String nomeUtente, String password);

	Utente saveUser(Utente user);

	Utente updateUser(Utente user);

	void deleteUser(Long id);

	Utente findById(Long id);
	
	Boolean abilita(Long id);

}
