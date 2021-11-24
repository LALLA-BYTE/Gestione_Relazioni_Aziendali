import React, { Component } from 'react';
import $ from "jquery";
import DipendentiDataService from '../service/DipendentiDataService';

class ModificaDipendente extends Component {
    constructor(props) {

        super(props)

        this.state = {
            id: localStorage.getItem("idDip"),
            nome: '',
            cognome: '',
            dataAssunzione: '',
            dataNascita: '',
            reparto: '',
            idRuolo: 0,
            ferieGodute: 0,
            ferieRimanenti: 0,
            ruoli: [],
            ruolo: null
        }

        this.changeInputHandler = this.changeInputHandler.bind(this);
        this.changeFerieHandler = this.changeFerieHandler.bind(this);
        this.salvaModifiche = this.salvaModifiche.bind(this);
       
    }


    componentDidMount() {

        DipendentiDataService.getDipById(this.state.id).then((res) => {
            let dipendente = res.data;

         //console.log("stampo il dipendente recuperato " + JSON.stringify(dipendente));

            this.setState({
                nome: dipendente.nome, cognome: dipendente.cognome,
                dataAssunzione: dipendente.dataAssunzione, dataNascita: dipendente.dataNascita,
                reparto: dipendente.reparto, idRuolo: dipendente.idRuolo,
                ferieGodute: dipendente.ferieGodute, ferieRimanenti: dipendente.ferieRimanenti
            });
        });

        DipendentiDataService.getRuoli().then((response) => {
            this.setState({ ruoli: response.data });
            console.log("stampo il response.data " + JSON.stringify(response.data));
        
            for (var i = 0; i < this.state.ruoli.length; i++) {
                if(this.state.ruoli[i].id == this.state.idRuolo.id){
           
                    console.log("entri nell'if?");

                    $('#dropdown-content').append(
                        "<option selected='selected' value='" + JSON.stringify(this.state.ruoli[i]) +
                        "' name='utenza'>" + this.state.ruoli[i].nomeRuolo + "</option>"
                    );

                } else {
                    $('#dropdown-content').append(
                        "<option value=" + JSON.stringify(this.state.ruoli[i]) +
                        " name='ruolo'>" + this.state.ruoli[i].nomeRuolo + "</option>"
                    );

                }

            }
            
        });
    }

    salvaModifiche = (e) => {
        e.preventDefault();

        let maxFerie = 28;
        let sommaFerie = parseInt(this.state.ferieGodute) + parseInt(this.state.ferieRimanenti);

        let dipendente = {
            nome: this.state.nome, cognome: this.state.cognome, dataAssunzione: this.state.dataAssunzione,
            dataNascita: this.state.dataNascita, reparto: this.state.reparto, 
            idRuolo: this.state.idRuolo, ferieGodute: sommaFerie
        };
        console.log('dipendente =>' + JSON.stringify(dipendente));

        if (parseInt(this.state.ferieGodute) > parseInt(maxFerie)) {
            alert("Hai superato i giorni di ferie a disposizione!")
        } else {
            DipendentiDataService.updateDip(dipendente, this.state.id).then(res => {
                console.log("stampo il response.data: " + JSON.stringify(res.data));
                this.props.history.push("/lista-dipendenti");
            });
        }

    }

    tornaIndietro() {
        this.props.history.push("/lista-dipendenti");
    }


    changeInputHandler = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }

       changeFerieHandler = (e) => {

        if (e.target.value < 0) {
            alert("Attenzione. Hai inserito un numero negativo");
        } if (e.target.value > 28) {
            alert("Attenzione. Non è possibile superare i 28 giorni di ferie!");
        }
        this.setState({ ferieGodute: e.target.value });
    }

    getVal = (event) => {
        this.setState({ ruolo: event.target.value});
        console.log("STAMPO IL RUOLO IN getVal  " + JSON.stringify(this.state.ruolo))

    };



    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Modifica Dipendente</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Nome:
                                            <input placeholder="Nome" name="nome" className="form-control"
                                                value={this.state.nome} onChange={this.changeInputHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>Cognome:
                                            <input placeholder="Cognome" name="cognome" className="form-control"
                                                value={this.state.cognome} onChange={this.changeInputHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>Data di assunzione:
                                            <input placeholder="Data di assunzione" name="dataAssunzione" className="form-control"
                                                value={this.state.dataAssunzione} onChange={this.changeInputHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>Data di nascita:
                                            <input placeholder="Data di nascita" name="dataNascita" className="form-control"
                                                value={this.state.dataNascita} onChange={this.changeInputHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label> Reparto:
                                            <input placeholder="Reparto" name="reparto" className="form-control"
                                                value={this.state.reparto} onChange={this.changeInputHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label> Ruolo:
                                            <select id='dropdown-content' onChange={this.getVal} className='form-select form-select-lg mb-3' name='ruolo'>
                                                <option value=''></option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label> Monte Ferie:
                                            <input type="number" name="ferie" className="form-control"
                                                value={28} disabled={true} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label> Richiedi Ferie:
                                            <input type="number" name="ferieGodute" className="form-control"
                                                value={this.state.ferieGodute} onChange={this.changeFerieHandler} />
                                        </label>
                                    </div>
                                    <div>
                                        <button style={{ marginTop: "10px" }} onClick={this.salvaModifiche}>Salva</button>
                                        <button style={{ marginTop: "10px" }} onClick={this.tornaIndietro.bind(this)} style={{ marginLeft: "10px" }}>Indietro</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


 } export default ModificaDipendente;


