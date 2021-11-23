import axios from 'axios';

const DIPENDENTI_API_BASE_URL = 'http://localhost:8080/api/dipendente/getAll';
const CREA_DIPENDENTE_URL = 'http://localhost:8080/api/dipendente/crea-nuovo';
const MODIFICA_DIPENDENTE_URL = 'http://localhost:8080/api/dipendente/modifica';
const CERCA_DIPENDENTE_URL = 'http://localhost:8080/api/dipendente/cerca';
const RICERCA_CON_FILTRI = 'http://localhost:8080/api/dipendente/cerca-dipendente';
const ELIMINA_DIPENDENTE_URL = 'http://localhost:8080/api/dipendente/elimina';
const RUOLI_URL = 'http://localhost:8080/api/ruolo/getAll';


class DipendentiDataService {

    //TODO METODO CERCA DIPENDENTE 
    
    getDipRicerca(dip){
        return axios.post(RICERCA_CON_FILTRI, dip);
    }

    getRuoli(){
        return axios.get(RUOLI_URL);
    }

    getAllDip(){

        return axios.get(DIPENDENTI_API_BASE_URL);
    }
    createDip(dip){
        return axios.post(CREA_DIPENDENTE_URL, dip);
    }

    getDipById(dipId){
        return axios.get(CERCA_DIPENDENTE_URL + '/' + dipId);
    }

    updateDip(dip, dipId){

        console.log("Entri nel metodo updateDip del service?" + JSON.stringify(dip))
        return axios.put(MODIFICA_DIPENDENTE_URL + '/' + dipId, dip);
    }

    deleteDip(dipId){

        return axios.delete(ELIMINA_DIPENDENTE_URL + '/' + dipId);
    }
   
}

export default new DipendentiDataService()

