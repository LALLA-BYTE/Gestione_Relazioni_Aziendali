import React, { Component } from 'react';
import $ from "jquery";
import UtentiDataService from '../service/UtentiDataService';

class ListaUtenti extends Component {
    constructor(props) {
        super(props)


        this.state = {

            utenteLoggato: localStorage.getItem("idProfiloUtente"),
            utenti: []
        }

        this.modificaUtente = this.modificaUtente.bind(this);
        this.disabilitaUtente = this.disabilitaUtente.bind(this);
        this.eliminaUtente = this.eliminaUtente.bind(this);
        this.creaUtente = this.creaUtente.bind(this);

        //console.log("stampo utenteLoggato: " + this.state.utenteLoggato);

        if (this.state.utenteLoggato !== "1" || this.state.utenteLoggato === null) {

            this.props.history.push('/login');
        }

    }

    componentDidMount() {

        UtentiDataService.mostraUtenti().then((res) => {
            this.setState({ utenti: res.data });

        });

    }

    modificaUtente(id) {

        localStorage.setItem("idUtente", id);
        this.props.history.push('/modifica-utente');
    }

    disabilitaUtente(id) {

        localStorage.setItem("idUtente", id);
        UtentiDataService.abilita(id).then((res) => {

            //this.setState({ utenti: res.data });
            //console.log("stampo gli utenti recuperati: " + JSON.stringify(this.state.utenti))

            this.setState({ utenti: this.state.utenti.filter(utente => utente.id !== id)});

        });

    }

    eliminaUtente(id) {

        UtentiDataService.deleteUtente(id).then(() => {

            this.setState({ utenti: this.state.utenti.filter(utente => utente.id !== id) });
            this.props.history.push('/lista-utenti');
            $("#ciccio").text("Utente eliminato").css({ color: "#a30505" });

        });
    }

    creaUtente() {

        this.props.history.push('/crea-utente');
    }



    render() {
        return (
            <div>
                <h2 className="text-center">Lista Utenti</h2>
                <div className="row">
                    <div>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Nome Utente</th>
                                    <th>Data Creazione</th>
                                    <th>Tipologia Profilo</th>
                                    <th>Azioni</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.utenti.map(
                                        utente =>
                                            <tr key={utente.id}>
                                                <td>{utente.nomeUtente}</td>
                                                <td>{utente.dataCreazione}</td>
                                                <td>{utente.profiloUtenteId.nomeProfilo}</td>
                                                <td>
                                                   {/* <button id="abilitazione" onClick={() => this.disabilitaUtente(utente.id)}>Disabilita</button>*/}
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.modificaUtente(utente.id)}>Modifica</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.eliminaUtente(utente.id)}>Elimina</button>
                                                </td>


                                            </tr>

                                    )

                                }

                            </tbody>
                        </table>
                    </div>
                    <div id="ciccio">

                    </div>
                    {this.state.utenteLoggato == "1" ?
                        <div>
                            <button style={{ marginLeft: "10px" }} onClick={() => this.creaUtente()}>Aggiungi Utente</button>
                        </div>
                        : null}
                </div>

            </div>
        );
    }
}

export default ListaUtenti;