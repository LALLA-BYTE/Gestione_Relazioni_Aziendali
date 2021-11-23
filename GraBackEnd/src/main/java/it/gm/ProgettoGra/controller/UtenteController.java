package it.gm.ProgettoGra.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.catalina.User;
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
import it.gm.ProgettoGra.service.UtenteServiceImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/utente")
public class UtenteController {

	@Autowired
	private UtenteServiceImpl uServiceImpl;

	@PostMapping(value = "/registra")
	public @ResponseBody Utente saveUser(@RequestBody Utente _utente) {

		
		Utente u = null;

		//controllo su username, che non sia già in uso.

		u = uServiceImpl.searchByNomeUtente(_utente.getNomeUtente());

		if (u == null) {

			_utente.setDataCreazione(LocalDate.now());

			u = uServiceImpl.saveUser(_utente);

			System.out.println("Stampo nuovo utente: " + u);

			return u;

		} else {

			return null;

		}

	}

	@PutMapping(value = "/abilita/{id}")
	public @ResponseBody List<Utente> abilitaUser(@PathVariable Long id) {

		System.out.println("passo per la riabilitazione");

		Utente user = null;

		user = uServiceImpl.findById(id);

		if (user.getAbilitato() == false) {

			user.setAbilitato(true);
			uServiceImpl.saveUser(user);

		} else {

			user.setAbilitato(false);
			uServiceImpl.saveUser(user);

		}

		return uServiceImpl.findAll();

	}

	@GetMapping(value = "/cerca/{id}")
	public @ResponseBody Utente findById(@PathVariable Long id) {

		return uServiceImpl.findById(id);

	}

	@PostMapping(value = "/ricerca-utente")
	public @ResponseBody List<Utente> cercaUtente(@RequestBody Utente _utente) {

		List<Utente> utenti = new ArrayList<Utente>();

		System.out.println("stampo i parametri di ricerca: " + _utente);

		// ricerca per username
		if (!_utente.getNomeUtente().equals("") && _utente.getPassword().equals("")
				&& _utente.getDataCreazione() == null) {

			System.out.println("sono nel ricerca per username!");
			utenti = uServiceImpl.findByNomeUtente(_utente.getNomeUtente());

			// ricerca per password
		} else if (_utente.getNomeUtente().equals("") && !_utente.getPassword().equals("")
				&& _utente.getDataCreazione() == null) {

			System.out.println("sono nel ricerca per password!");
			utenti = uServiceImpl.findByPassword(_utente.getPassword());

			// ricerca per dataCreazione
		} else if (_utente.getNomeUtente().equals("") && _utente.getPassword().equals("")

				&& _utente.getDataCreazione() != null) {

			utenti = uServiceImpl.findByDataCreazione(_utente.getDataCreazione());

			// ricerca per nome e password
		} else if (!_utente.getNomeUtente().equals("") && !_utente.getPassword().equals("")

				&& _utente.getDataCreazione() == null) {

			utenti = uServiceImpl.searchByNomeUtenteAndPassword(_utente.getNomeUtente(), _utente.getPassword());

			// ricerca per nome e data creazione
		} else if (!_utente.getNomeUtente().equals("") && _utente.getPassword().equals("")

				&& _utente.getDataCreazione() != null) {

			utenti = uServiceImpl.findByNomeUtenteAndDataCreazione(_utente.getNomeUtente(), _utente.getDataCreazione());

			// ricerca per password e data creazione
		} else if (_utente.getNomeUtente().equals("") && !_utente.getPassword().equals("")

				&& _utente.getDataCreazione() != null) {

			utenti = uServiceImpl.findByPasswordAndDataCreazione(_utente.getPassword(), _utente.getDataCreazione());

			// ricerca per password e data creazione
		} else {

			return null;

		}

		return utenti;

	}

	@PostMapping(value = "/login")
	public @ResponseBody Utente checkUser(@RequestBody Utente utente) {

		Utente utenteTrovato = uServiceImpl.findByNomeUtenteAndPassword(utente.getNomeUtente(), utente.getPassword());
		System.out.println("stampo l'utente trovato nel metodo login");
		return utenteTrovato;
	}

	// Metodi CRUD

	@GetMapping(value = "/lista-utenti-abilitati")
	public @ResponseBody List<Utente> mostraUtenti() {

		List<Utente> listaUtenti = uServiceImpl.findAll();

		List<Utente> utentiAbilitati = new ArrayList<>();

		for (Utente utente : listaUtenti) {
			if (utente.getAbilitato() == true) {
				utentiAbilitati.add(utente);
			}
		}

		System.out.println("stampo gli utenti: " + utentiAbilitati);

		return utentiAbilitati;

	}

	@GetMapping(value = "utenti-non-abilitati")
	public @ResponseBody List<Utente> listaUtentiDaAbilitare() {

		List<Utente> listaUtenti = uServiceImpl.findAll();

		List<Utente> utentiNonAbilitati = new ArrayList<>();

		for (Utente utente : listaUtenti) {
			if (utente.getAbilitato() == false) {
				utentiNonAbilitati.add(utente);
			}
		}

		return utentiNonAbilitati;

	}

	@PutMapping(value = "/modifica/{id}")
	public ResponseEntity<Utente> modificaUser(@PathVariable Long id, @RequestBody Utente dettagliUtente) {

		Utente utente = uServiceImpl.findById(id);

		utente.setNomeUtente(dettagliUtente.getNomeUtente());
		utente.setPassword(dettagliUtente.getPassword());
		utente.setProfiloUtenteId(dettagliUtente.getProfiloUtenteId());

		Utente utenteModificato = uServiceImpl.saveUser(utente);

		System.out.println("Utente Modificato: " + utenteModificato);

		return ResponseEntity.ok(utenteModificato);

	}

	@DeleteMapping(value = "/elimina/{id}")
	public ResponseEntity<Map<String, Boolean>> eliminaUser(@PathVariable Long id) {

		uServiceImpl.deleteUser(id);

		Map<String, Boolean> response = new HashMap<>();

		response.put("User eliminato", Boolean.TRUE);

		return ResponseEntity.ok(response);

	}

}
