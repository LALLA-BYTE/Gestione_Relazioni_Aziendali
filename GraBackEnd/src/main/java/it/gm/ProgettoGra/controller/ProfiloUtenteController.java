package it.gm.ProgettoGra.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import it.gm.ProgettoGra.entity.ProfiloUtente;
import it.gm.ProgettoGra.service.ProfiloUtenteServiceImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/profilo-utente")
public class ProfiloUtenteController {

	
	@Autowired 
	ProfiloUtenteServiceImpl profiloUtenteService;
	
	@GetMapping("/lista-profili")
	public @ResponseBody List<ProfiloUtente> getProfiliUtente() {
		
		 
		return profiloUtenteService.findAll();
		
		
		
	}
	
	
	
	
	
}
