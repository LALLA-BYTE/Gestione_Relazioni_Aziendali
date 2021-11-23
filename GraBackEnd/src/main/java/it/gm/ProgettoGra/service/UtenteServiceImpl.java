package it.gm.ProgettoGra.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.gm.ProgettoGra.entity.Utente;
import it.gm.ProgettoGra.repository.UtenteRepository;

@Service
@Transactional
public class UtenteServiceImpl implements UtenteService {

	private UtenteRepository uRepository;

	public UtenteServiceImpl() {

	}

	@Autowired
	public UtenteServiceImpl(UtenteRepository _uRepository) {
		super();
		this.uRepository = _uRepository;
	}

	public List<Utente> findAll() {
		List<Utente> utenti = new ArrayList<Utente>();
		uRepository.findAll().forEach(utenti::add);
		return utenti;
	}

	@Override
	public Utente findById(Long id) {

		Utente user = new Utente();

		try {

			user = uRepository.findById(id).get();

		} catch (Exception ex) {

		}
		return user;
	}

	@Override
	public List<Utente> findByDataCreazione(LocalDate dataCreazione) {

		List<Utente> utenti = new ArrayList<Utente>();
		try {
			uRepository.findByDataCreazione(dataCreazione).forEach(utenti::add);
			return utenti;
		} catch (Exception ex) {
			return null;
		}
	}

	public List<Utente> findByNomeUtente(String nomeUtente) {

		List<Utente> utenti = new ArrayList<Utente>();

		try {
			uRepository.findByNomeUtente(nomeUtente).forEach(utenti::add);

			return utenti;
		} catch (Exception ex) {
			return null;
		}
	}

	@Override
	public Utente searchByNomeUtente(String nomeUtente) {
		Utente _utente = null;

		try {
			_utente = uRepository.searchByNomeUtente(nomeUtente);
			return _utente;
		} catch (Exception ex) {
			return null;
		}
	}

	public List<Utente> findByPassword(String password) {

		List<Utente> utenti = new ArrayList<Utente>();

		try {
			uRepository.findByPassword(password).forEach(utenti::add);

			return utenti;
		} catch (Exception ex) {
			return null;
		}
	}

	public Utente findByNomeUtenteAndPassword(String nomeUtente, String password) {

		Utente userSaved = null;

		try {

			userSaved = uRepository.findByNomeUtenteAndPassword(nomeUtente, password);
			return userSaved;

		} catch (Exception ex) {

			System.out.println("stampo l eccezione " + ex);

			return null;
		}
	}

	public List<Utente> searchByNomeUtenteAndPassword(String nomeUtente, String password) {

		List<Utente> utenti = new ArrayList<Utente>();

		try {
			utenti = uRepository.searchByNomeUtenteAndPassword(nomeUtente, password);
			return utenti;
		} catch (Exception ex) {
			return null;
		}
	}

	public List<Utente> findByNomeUtenteAndDataCreazione(String nomeUtente, LocalDate dataCreazione) {

		List<Utente> utenti = new ArrayList<Utente>();
		try {
			uRepository.findByNomeUtenteAndDataCreazione(nomeUtente, dataCreazione).forEach(utenti::add);
			;
			return utenti;
		} catch (Exception ex) {
			return null;
		}
	}

	public List<Utente> findByPasswordAndDataCreazione(String password, LocalDate dataCreazione) {

		List<Utente> utenti = new ArrayList<Utente>();

		try {
			uRepository.findByPasswordAndDataCreazione(password, dataCreazione).forEach(utenti::add);
			return utenti;
		} catch (Exception ex) {
			return null;
		}
	}

	@Override
	public Utente validate(String nomeUtente, String password) {
		if (nomeUtente != null)
			nomeUtente = nomeUtente.toLowerCase();
		return uRepository.findByNomeUtenteAndPassword(nomeUtente, password);
	}

	public Boolean abilita(Long id) {

		Utente utente = null;

		try {

			utente = uRepository.getById(id);

			if (utente.getAbilitato() == false) {

				utente.setAbilitato(true);
			} else {

				utente.setAbilitato(false);
			}

			return utente.getAbilitato();

		} catch (Exception ex) {

			return null;
		}

	}

	@Override
	public void deleteUser(Long id) {

		try {
			uRepository.deleteById(id);

		} catch (Exception ex) {

		}
	}

	public Utente saveUser(Utente user) {

		Utente userSaved = null;
		List<Utente> userChecked = null;

		userChecked = uRepository.findByNomeUtente(user.getNomeUtente());

		System.out.println("STAMPO LO USERCHECKED " + userChecked);

		if (userChecked.isEmpty()) {

			try {
				userSaved = uRepository.save(user);
				return userSaved;
			} catch (Exception e) {

				System.out.println("eccezione: " + e);
			}

		} else {

			System.out.println("entrato nell'else. UserName già in uso!");
		}

		return userSaved;
	}

	@Override
	public Utente updateUser(Utente user) {

		try {
			Utente userSaved = uRepository.save(user);
			return userSaved;
		} catch (Exception ex) {
			return null;
		}
	}

}
