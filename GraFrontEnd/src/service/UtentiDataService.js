import axios from 'axios';

const UTENTI_API_BASE_URL = 'http://localhost:8080/api/utente/login';
const MOSTRA_API_BASE_URL = 'http://localhost:8080/api/utente/lista-utenti-abilitati';
const CREA_UTENTI_API_BASE_URL = 'http://localhost:8080/api/utente/registra';
const CERCA_UTENTE_URL = 'http://localhost:8080/api/utente/cerca';
const MODIFICA_UTENTI_API_BASE_URL = 'http://localhost:8080/api/utente/modifica';
const ELIMINA_UTENTI_API_BASE_URL = 'http://localhost:8080/api/utente/elimina';
const RICERCA_URL = 'http://localhost:8080/api/utente/ricerca-utente';
const ABILITA_URL = 'http://localhost:8080/api/utente/abilita';
const LISTA_NON_ABILITATI_URL = 'http://localhost:8080/api/utente/utenti-non-abilitati';
const PROFILI_UTENTE_URL = 'http://localhost:8080/api/profilo-utente/lista-profili';




class UtentiDataService {

    listaNonAbilitati(){

        return axios.get(LISTA_NON_ABILITATI_URL);
    }


    abilita(utenteId){
        return axios.put( ABILITA_URL + "/" + utenteId);
    }

    ricerca(utente){

        return axios.post(RICERCA_URL, utente);
    }

    findById(utenteId){

        return axios.get(CERCA_UTENTE_URL + "/" + utenteId);
    }

    checkUtente(utente){
       return axios.post(UTENTI_API_BASE_URL, utente);
    }

    mostraUtenti(){
       return axios.get(MOSTRA_API_BASE_URL);
    }
  
    mostraProfiliUtente(){
    return axios.get(PROFILI_UTENTE_URL);

    }

    creaUtente(utente){
        return axios.post(CREA_UTENTI_API_BASE_URL, utente);
    }

    updateUtente(utente,utenteId){

        return axios.put(MODIFICA_UTENTI_API_BASE_URL + '/' + utenteId, utente);
    }

    deleteUtente(utenteId){

        return axios.delete(ELIMINA_UTENTI_API_BASE_URL + '/' + utenteId);
    }
   
}

export default new UtentiDataService()
