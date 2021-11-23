package it.gm.ProgettoGra.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import it.gm.ProgettoGra.entity.Dipendente;
import it.gm.ProgettoGra.entity.Utente;
import it.gm.ProgettoGra.exception.ResourceNotFoundException;
import it.gm.ProgettoGra.repository.DipRepository;
import it.gm.ProgettoGra.service.DipServiceImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/dipendente")
public class DipController {

	@Autowired
	private DipServiceImpl dipService;
	
	
	//Metodi di Ricerca

	@GetMapping("/getAll")
	public @ResponseBody List<Dipendente> getAllDip() {

		System.out.println("stampo lista dipendenti: " +  dipService.findAll());
		return dipService.findAll();
	}
	
	@GetMapping("/cerca/{id}")
	public @ResponseBody Dipendente getDipById(@PathVariable Long id) {

		return dipService.findById(id);

	}
	
	@PostMapping("cerca-dipendente")
	public @ResponseBody List<Dipendente> cercaNome(@RequestBody Dipendente dipendente) {

		List<Dipendente> dipendenti = null;


		// ricerca per nome dipendente
		if (!dipendente.getNome().equals("") && dipendente.getCognome().equals("")
				&& dipendente.getReparto().equals("")) {

			dipendenti = dipService.findByNome(dipendente.getNome());

			// ricerca per cognome
		} else if (dipendente.getNome().equals("") && dipendente.getReparto().equals("")
				&& !dipendente.getCognome().equals("")) {

			dipendenti = dipService.findByCognome(dipendente.getCognome());

			// ricerca per reparto
		} else if (dipendente.getNome().equals("") && dipendente.getCognome().equals("")
				&& !dipendente.getReparto().equals("")) {

			dipendenti = dipService.findByReparto(dipendente.getReparto());
			
			// ricerca per nome e cognome
		} else if (!dipendente.getNome().equals("") && !dipendente.getCognome().equals("")
				&& dipendente.getReparto().equals("")) {

			dipendenti = dipService.findByNomeAndCognome(dipendente.getNome(), dipendente.getCognome());
			

			//ricerca per nome e reparto
		} else if(!dipendente.getNome().equals("") && !dipendente.getReparto().equals("")
				&& dipendente.getCognome().equals("")) {
			
			
			dipendenti = dipService.findByNomeAndReparto(dipendente.getNome(), dipendente.getReparto());
			
			//ricerca per cognome e reparto
		} else if(dipendente.getNome().equals("") && !dipendente.getReparto().equals("")
				&& !dipendente.getCognome().equals("")) {
			
			dipendenti = dipService.findByCognomeAndReparto(dipendente.getCognome(), dipendente.getReparto());
			
		} else {
			
			return null;
		}

		
		return dipendenti;
	}

	
	//Metodi CRUD

	@PostMapping("/crea-nuovo")
	public @ResponseBody Dipendente creaDip(@RequestBody Dipendente dipendente) {

		Dipendente dip = null;
		dip = dipService.saveDip(dipendente);

		System.out.println("Stampo nuovo utente: " + dip);

		return dip;

	}
	
	@PutMapping("modifica/{id}")
	public ResponseEntity<Dipendente> modificaDip(@PathVariable Long id, @RequestBody Dipendente dettagliDipendente) {

		Dipendente dip = dipService.findById(id);

		dip.setNome(dettagliDipendente.getNome());
		dip.setCognome(dettagliDipendente.getCognome());
		dip.setDataAssunzione(dettagliDipendente.getDataAssunzione());
		dip.setDataNascita(dettagliDipendente.getDataNascita());
		dip.setReparto(dettagliDipendente.getReparto());
		dip.setIdRuolo(dettagliDipendente.getIdRuolo());
		dip.setFerieGodute(dettagliDipendente.getFerieGodute());
		dip.setFerieRimanenti(dettagliDipendente.getFerieRimanenti());
		
		Dipendente dipModificato = dipService.saveDip(dip);

		System.out.println("stampo il dipendente modificato " + dipModificato);

		return ResponseEntity.ok(dipModificato);

	}

	@DeleteMapping("elimina/{id}")
	public ResponseEntity<Map<String, Boolean>> eliminaDip(@PathVariable Long id) {

		dipService.deleteDip(id);

		Map<String, Boolean> response = new HashMap<>();

		response.put("dipendente eliminato", Boolean.TRUE);

		System.out.println(response);

		return ResponseEntity.ok(response);

	}

	


}
