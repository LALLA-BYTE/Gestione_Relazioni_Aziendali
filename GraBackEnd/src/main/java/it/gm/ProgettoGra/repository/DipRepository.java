package it.gm.ProgettoGra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gm.ProgettoGra.entity.Dipendente;

@Repository
public interface DipRepository extends JpaRepository<Dipendente,Long>{

	List<Dipendente> findByNome(String _nome);
	
	List<Dipendente> findByNomeAndCognome(String nome, String cognome);
	
	List<Dipendente> findByNomeAndReparto(String nome, String reparto);
	
	List<Dipendente> findByCognomeAndReparto(String cognome, String reparto);
	
	List<Dipendente> findByCognome(String cognome);

	List<Dipendente> findByReparto(String reparto);

	
}
