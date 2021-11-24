import React, { Component } from 'react';
import $ from "jquery";
import DipendentiDataService from '../service/DipendentiDataService';

class RicercaDipendente extends Component {
    constructor(props) {
        super(props)


        this.state = {

            utenteLoggato: localStorage.getItem("idProfiloUtente"),
            ricerca: false,
            check1: false,
            check2: false,
            check3: false,
            nome: "",
            cognome: "",
            dataNascita: "",
            dataAssunzione: "",
            reparto: "",
            dipendenti: []

        }

        this.salvaInputRicerca = this.salvaInputRicerca.bind(this);
        this.azzeraRicerca = this.azzeraRicerca.bind(this);
        this.mostraRisultati = this.mostraRisultati.bind(this);


        if (this.state.utenteLoggato == null) {
            this.props.history.push('/login');
        }

    }

    salvaInputRicerca() {

        let dipendente = {
            nome: this.state.nome, cognome: this.state.cognome, reparto: this.state.reparto
        };

        DipendentiDataService.getDipRicerca(dipendente).then(res => {

            console.log("stampo il res.data => " + JSON.stringify(res.data))

            if (res.data == "") {
                $("#risultati").text("Nessun risultato trovato");
            } else {

                $("#risultati").text("");
                this.setState({ dipendenti: res.data });
                this.setState({ ricerca: true });
                this.mostraRisultati();
            }
        });

    }

    azzeraRicerca() {

        this.setState({ nome: "" });
        this.setState({ cognome: "" });
        this.setState({ reparto: "" });
        this.setState({ ricerca: false });
        this.setState({ check1: false });
        this.setState({ check2: false });
        this.setState({ check3: false });
    }

    onChangeHandler = (e) => {

        this.setState({ [e.target.name]: e.target.checked });

    }
    changeInputHandler = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    mostraRisultati() {

        // e.preventDefault();

        console.log("sono nel metodo stampa tabella " + JSON.stringify(this.state.dipendenti));
        if (this.state.ricerca) {

            return (
                <>
                    <div className="results-container">
                        <h5 className="text-center">Risultati Ricerca</h5><div className="row">
                            <div></div>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Cognome</th>
                                        <th>Data di assunzione</th>
                                        <th>Data di nascita</th>
                                        <th>Reparto</th>
                                        <th>Ruolo</th>
                                        <th>Azioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.dipendenti.map(
                                        dipendente => <tr key={dipendente.id}>
                                            <td>{dipendente.nome}</td>
                                            <td>{dipendente.cognome}</td>
                                            <td>{dipendente.dataAssunzione}</td>
                                            <td>{dipendente.dataNascita}</td>
                                            <td>{dipendente.reparto}</td>
                                            <td>{dipendente.idRuolo.nomeRuolo}</td>
                                            <td>
                                                <button onClick={() => this.modificaDipendente(dipendente.id)}>Modifica</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.eliminaDipendente(dipendente.id)}>Elimina</button>

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table></div>
                    </div>
                </>
            );
        }
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3"></div>
                        <h4 className="text-centerrr" style={{ marginTop: "10px" }}>RICERCA DIPENDENTI</h4>
                        <hr/>
                        <h5 className="text-centerrr" style={{ marginTop: "10px" }}>Inserisci filtri di ricerca: </h5>
                        <div>
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <div className="checkbox-dipendenti">
                                    <div className="checkbox1">
                                        <input type="checkbox" name="check1" checked={this.state.check1} onChange={this.onChangeHandler} /><h6>Nome</h6>
                                    </div>
                                    <div className="checkbox2">
                                        <input type="checkbox" name="check2" checked={this.state.check2} onChange={this.onChangeHandler} /><h6>Cognome</h6>
                                    </div>
                                    <div className="checkbox3">
                                        <input type="checkbox" name="check3" checked={this.state.check3} onChange={this.onChangeHandler} /><h6>Reparto</h6>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input placeholder="Nome" name="nome" className="form-control" disabled={!this.state.check1}
                                        value={this.state.nome} onChange={this.changeInputHandler} />
                                </div>
                                <div className="form-group">
                                    <input placeholder="Cognome" name="cognome" className="form-control" disabled={!this.state.check2}
                                        value={this.state.cognome} onChange={this.changeInputHandler} />
                                </div>
                                <div className="form-group">
                                    <input placeholder="Reparto" name="reparto" className="form-control" disabled={!this.state.check3}
                                        value={this.state.reparto} onChange={this.changeInputHandler} />
                                </div>
                                <div>
                                    <button style={{ marginTop: "10px" }} onClick={() => this.salvaInputRicerca()}>Avvia Ricerca</button>
                                    <button style={{ marginTop: "10px" }} onClick={this.azzeraRicerca}>Azzera Ricerca</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="risultati">{this.mostraRisultati()}</div>
                </div>
            </div >

        );


    }

} export default RicercaDipendente;

