package it.gm.ProgettoGra.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import it.gm.ProgettoGra.entity.Utente;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, Long> {

	List<Utente> findAll();

	List<Utente> findByNomeUtente(String nomeUtente);

	List<Utente> findByPassword(String password);
	
	List<Utente> findByDataCreazione(LocalDate dataCreazione);

	List<Utente> findByPasswordAndDataCreazione(String password, LocalDate dataCreazione);

	List<Utente> findByNomeUtenteAndDataCreazione(String nomeUtente, LocalDate dataCreazione);

	Utente findByNomeUtenteAndPassword(String nomeUtente, String password);
	
	Utente searchByNomeUtente(String nomeUtente);
	
	List<Utente> searchByNomeUtenteAndPassword(String nomeUtente, String password);
	
	

}