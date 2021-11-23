package it.gm.ProgettoGra.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import it.gm.ProgettoGra.entity.ProfiloUtente;
import it.gm.ProgettoGra.repository.ProfiloUtenteRepository;

@Service
@Transactional
public class ProfiloUtenteServiceImpl {

	
@Autowired 
ProfiloUtenteRepository profiloUtenteRep;
	

 public List<ProfiloUtente> findAll() {
	 
	 List<ProfiloUtente> profiliUtente = new ArrayList<ProfiloUtente>();
	 profiloUtenteRep.findAll().forEach(profiliUtente::add);
	
	 return profiliUtente;
	
		 
	 }
	 
 
	
	
	
}
