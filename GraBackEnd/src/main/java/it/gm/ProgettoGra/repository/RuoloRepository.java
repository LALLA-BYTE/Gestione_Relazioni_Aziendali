package it.gm.ProgettoGra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gm.ProgettoGra.entity.Ruolo;


@Repository
public interface RuoloRepository extends JpaRepository<Ruolo,Long> {


	List<Ruolo> findAll();


	
}
