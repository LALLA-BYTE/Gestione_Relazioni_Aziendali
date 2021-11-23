package it.gm.ProgettoGra.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import it.gm.ProgettoGra.entity.Ruolo;

import it.gm.ProgettoGra.service.RuoloServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/ruolo")
public class RuoloController {

	
	
	@Autowired
	private RuoloServiceImpl ruoloService;
	
	
	@GetMapping("/getAll")
	public @ResponseBody List<Ruolo> getRuoli() {
		
		List<Ruolo> lista = ruoloService.findAll();
		
		System.out.println("stampo lista ruoli: " + lista.toString());
		
		return lista;
	}
	
	
	
}
