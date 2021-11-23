package it.gm.ProgettoGra.service;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import it.gm.ProgettoGra.entity.Dipendente;
import it.gm.ProgettoGra.entity.Utente;
import it.gm.ProgettoGra.repository.DipRepository;

@Service
@Transactional
public class DipServiceImpl implements DipService {

	private DipRepository dipRepository;

	public DipServiceImpl() {

	}

	@Autowired
	public DipServiceImpl(DipRepository _dipRepository) {
		super();
		this.dipRepository = _dipRepository;
	}

	@Override
	public List<Dipendente> findAll() {

		List<Dipendente> dipendenti = new ArrayList<Dipendente>();

		try {
			dipRepository.findAll().forEach(dipendenti::add);
			return dipendenti;
		} catch (Exception ex) {
			return null;
		}

	}

	@Override
	public Dipendente findById(Long id) {

		try {
			Dipendente dipSaved = dipRepository.findById(id).get();
			return dipSaved;
		} catch (Exception ex) {
			return null;
		}
	}

	@Override
	public List<Dipendente> findByNome(String _nome) {

		List<Dipendente> dipendenti = new ArrayList<Dipendente>();
		try {
			dipRepository.findByNome(_nome).forEach(dipendenti::add);
			return dipendenti;
		} catch (Exception ex) {
			return null;
		}
	}

	@Override
	public List<Dipendente> findByCognome(String cognome) {

		List<Dipendente> dipendenti = new ArrayList<Dipendente>();

		try {

			dipRepository.findByCognome(cognome).forEach(dipendenti::add);
			return dipendenti;
		} catch (Exception ex) {
			return null;
		}

	}
	
	public List<Dipendente> findByNomeAndCognome(String nome, String cognome) {

		 List<Dipendente> dipendenti = new ArrayList<Dipendente>();
		
		try {
			 dipRepository.findByNomeAndCognome(nome, cognome).forEach(dipendenti::add);;
			return dipendenti;
		} catch (Exception ex) {
			return null;
		}
	}
	
	public List<Dipendente> findByNomeAndReparto(String nome, String reparto) {

		 List<Dipendente> dipendenti = new ArrayList<Dipendente>();
		
		try {
			 dipRepository.findByNomeAndReparto(nome, reparto).forEach(dipendenti::add);
			return dipendenti;
		} catch (Exception ex) {
			return null;
		}
	}
	
	public List<Dipendente> findByCognomeAndReparto(String cognome, String reparto) {

		 List<Dipendente> dipendenti = new ArrayList<Dipendente>();
		
		try {
			 dipRepository.findByNomeAndReparto(cognome, reparto).forEach(dipendenti::add);;
			return dipendenti;
		} catch (Exception ex) {
			return null;
		}
	}

	@Override
	public List<Dipendente> findByReparto(String reparto) {

		List<Dipendente> dipendenti = new ArrayList<Dipendente>();

		try {

			dipRepository.findByReparto(reparto).forEach(dipendenti::add);
			
			return dipendenti;
		} catch (Exception ex) {
			return null;
		}

	}

	@Override
	public Dipendente saveDip(Dipendente _dipendente) {

		try {
			Dipendente dipSaved = dipRepository.save(_dipendente);
			return dipSaved;
		} catch (Exception ex) {
			return null;
		}
	}

	@Override
	public Dipendente updateDip(Dipendente _dipendente) {

		try {
			Dipendente dipSaved = dipRepository.save(_dipendente);
			return dipSaved;
		} catch (Exception ex) {
			return null;
		}
	}

	@Override
	public void deleteDip(Long _id) {

		try {
			dipRepository.deleteById(_id);

		} catch (Exception ex) {

		}

	}

}
