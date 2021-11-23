package it.gm.ProgettoGra.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.gm.ProgettoGra.entity.Ruolo;
import it.gm.ProgettoGra.entity.Utente;
import it.gm.ProgettoGra.repository.RuoloRepository;
import it.gm.ProgettoGra.repository.UtenteRepository;


@Service
@Transactional
public class RuoloServiceImpl implements RuoloService{

	private RuoloRepository ruoloRepository;

	public RuoloServiceImpl() {

	}

	@Autowired
	public RuoloServiceImpl(RuoloRepository _ruoloRepository) {
		super();
		this.ruoloRepository =  _ruoloRepository;
	}

	@Override
	public List<Ruolo> findAll() {
	
		List<Ruolo> ruoli = new ArrayList<Ruolo>();
		ruoloRepository.findAll().forEach(ruoli::add);
		return ruoli;
	
	}

	
	
	
	
	
}

