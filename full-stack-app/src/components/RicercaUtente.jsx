import React, { Component } from 'react';
import $ from "jquery";
import { Row, Container } from 'react-bootstrap';
import UtentiDataService from '../service/UtentiDataService';


class RicercaUtente extends Component {
    constructor(props) {
        super(props)


        this.state = {

            utenteLoggato: localStorage.getItem("idProfiloUtente"),
            ricerca: false,
            checkbox: false,
            checked1: false,
            checked2: false,
            checked3: false,
            nomeUtente: "",
            password: "",
            dataCreazione: "",
            idProfiloUtente: "",
            utenti: []

        }

        this.salvaInputRicerca = this.salvaInputRicerca.bind(this);
        this.azzeraRicerca = this.azzeraRicerca.bind(this);
        this.mostraRisultati = this.mostraRisultati.bind(this);
        this.mostraUtentiDisabilitati = this.mostraUtentiDisabilitati.bind(this);
        this.mostraListaDisabilitati = this.mostraListaDisabilitati.bind(this);
        this.onChangeInputHandler = this.onChangeInputHandler.bind(this);



        if (this.state.utenteLoggato === null || this.state.utenteLoggato !== "1") {

            this.props.history.push('/login');
        }

    }

    salvaInputRicerca() {

        let utente = {
            nomeUtente: this.state.nomeUtente, password: this.state.password, dataCreazione: this.state.dataCreazione
        };
        console.log('utente =>' + JSON.stringify(utente));


        UtentiDataService.ricerca(utente).then(res => {

            console.log("stampo il res.data => " + JSON.stringify(res.data))
           
            if (res.data == "" ) {
                $("#risultati").text("Nessun risultato trovato");

            } else {
                
                $("#risultati").text("");
                this.setState({ utenti: res.data });
                this.setState({ ricerca: true });
                this.mostraRisultati();
            }

        });

    }

    mostraUtentiDisabilitati = (event) => {

        UtentiDataService.listaNonAbilitati().then((res) => {
            this.setState({ utenti: res.data });
            console.log("stampo gli utenti recuperati: " + JSON.stringify(this.state.utenti));
        });

        this.setState({ checkbox: true });
        this.mostraListaDisabilitati();

    }

    mostraListaDisabilitati() {

        if (this.state.checkbox) {

            return (
                <>
                    <Container>
                        <Row lg={12}>
                            <h5 className="text-center">Risultati Ricerca</h5>

                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Password</th>
                                        <th>Data di creazione</th>
                                        <th>Profilo Utente</th>
                                        <th>Abilitazione</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.utenti.map(
                                        utente => <tr key={utente.id}>
                                            <td>{utente.nomeUtente}</td>
                                            <td>{utente.password}</td>
                                            <td>{utente.dataCreazione}</td>
                                            <td>{utente.profiloUtenteId.nomeProfilo}</td>
                                            <td>
                                                <button id="abilitazione" onClick={() => this.abilitaUtente(utente.id)}>Abilita</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Row>
                    </Container>
                </>
            );

        }

    }

    abilitaUtente(id) {

        localStorage.setItem("idUtente", id);
        UtentiDataService.abilita(id).then((res) => {

            this.setState({ utenti: this.state.utenti.filter(utente => utente.id !== id) });
            //this.props.history.push('/utenti-disabilitati');

        });


    }

    azzeraRicerca() {

        this.setState({ nomeUtente: "" });
        this.setState({ password: "" });
        this.setState({ dataCreazione: "" });
        this.setState({ ricerca: false });
        this.setState({ checkbox: false });
        this.setState({ checked1: false });
        this.setState({ checked2: false });
        this.setState({ checked3: false });

    }

    onChangeInputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    modificaUtente(id) {

        localStorage.setItem("idUtente", id);
        this.props.history.push('/modifica-utente');
    }

    mostraRisultati() {


        if (this.state.ricerca) {

            return (
                <>
                    <Container>
                        <Row lg={12}>
                            <h5 className="text-center">Risultati Ricerca</h5>

                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nome Utente</th>
                                        <th>Password</th>
                                        <th>Data di creazione</th>
                                        <th>Profilo Utente</th>
                                        <th>Azioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.utenti.map(
                                        utente => <tr key={utente.id}>
                                            <td>{utente.nomeUtente}</td>
                                            <td>{utente.password}</td>
                                            <td>{utente.dataCreazione}</td>
                                            <td>{utente.profiloUtenteId.nomeProfilo}</td>
                                            <td>
                                                <button onClick={() => this.modificaUtente(utente.id)}>Modifica</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.eliminaUtente(utente.id)}>Elimina</button>

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Row>
                    </Container>
                </>
            );

        }

    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h4 className="text-centerrr" style={{ marginTop: "10px" }}>RICERCA UTENTI</h4>
                            <hr />
                            <h5 className="text-centerrr" style={{ marginTop: "10px" }}>Seleziona filtri di ricerca:</h5>
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <div className="checkbox-utenti">
                                    <div className="checkbox1">
                                        <input type="checkbox" name="checked1" checked={this.state.checked1} onChange={this.onChangeHandler} /><h6>Nome Utente</h6>
                                    </div>
                                    <div className="checkbox2">
                                        <input type="checkbox" name="checked2" checked={this.state.checked2} onChange={this.onChangeHandler} /><h6>Password</h6>
                                    </div>
                                    <div className="checkbox3">
                                        <input type="checkbox" name="checked3" checked={this.state.checked3} onChange={this.onChangeHandler} /><h6>Creazione Utenza</h6>
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginTop: "20px" }}>
                                    <label>Nome Utente:
                                        <input placeholder="Username" name="nomeUtente" className="form-control" disabled={!this.state.checked1}
                                            value={this.state.nomeUtente} onChange={this.onChangeInputHandler} />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Password:
                                        <input placeholder="Password" name="password" className="form-control" disabled={!this.state.checked2}
                                            value={this.state.password} onChange={this.onChangeInputHandler} />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Data Creazione Utenza:<input type="date" name="dataCreazione"
                                        className="form-control" disabled={!this.state.checked3}
                                        value={this.state.dataCreazione} onChange={this.onChangeInputHandler} />
                                    </label>
                                </div>
                                <div>
                                    <button style={{ marginTop: "10px" }} onClick={() => this.salvaInputRicerca()}>Avvia Ricerca</button>
                                    <button style={{ marginTop: "10px" }} onClick={this.azzeraRicerca}>Azzera Ricerca</button><br />
                                    <button onClick={() => this.mostraUtentiDisabilitati()}>Mostra Utenti In Attesa</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="risultati">{this.mostraRisultati()}</div><div>{this.mostraListaDisabilitati()}</div>
                </div>
            </div>

        );
    }

} export default RicercaUtente;

