package it.gm.ProgettoGra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.gm.ProgettoGra.entity.ProfiloUtente;
import it.gm.ProgettoGra.entity.Utente;

public interface ProfiloUtenteRepository extends JpaRepository<ProfiloUtente,Long>{

	List<ProfiloUtente> findAll();
	
}
