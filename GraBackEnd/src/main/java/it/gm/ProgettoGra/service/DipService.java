package it.gm.ProgettoGra.service;

import java.util.List;

import it.gm.ProgettoGra.entity.Dipendente;

public interface DipService {
	
	List<Dipendente> findAll();

	List<Dipendente> findByNome(String nome);

	List<Dipendente> findByCognome(String cognome);

	List<Dipendente> findByReparto(String reparto);

	List<Dipendente> findByNomeAndCognome(String nome, String cognome);

	List<Dipendente> findByNomeAndReparto(String nome, String reparto);

	List<Dipendente> findByCognomeAndReparto(String cognome, String reparto);

	Dipendente findById(Long id);

	
	// Dipendente validate(String nomeUtente, String password);

	Dipendente saveDip(Dipendente user);

	Dipendente updateDip(Dipendente user);

	void deleteDip(Long id);

}
