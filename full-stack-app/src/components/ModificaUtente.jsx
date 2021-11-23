import React, { Component } from 'react';
import $ from "jquery";
import UtentiDataService from '../service/UtentiDataService';

class ModificaUtente extends Component {
    constructor(props) {
        super(props)

        this.state = {

            id: localStorage.getItem("idUtente"),
            nomeUtente: "",
            password: "",
            dataCreazione: "",
            idProfiloUtente: 0,
            abilitato: Boolean,
            utenze: [],
            utenza: null,

        }

        this.salvaUtente = this.salvaUtente.bind(this);
        this.tornaIndietro = this.tornaIndietro.bind(this);
        this.getVal = this.getVal.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.abilitaUtente = this.abilitaUtente.bind(this);
    }


    componentDidMount() {

        UtentiDataService.findById(this.state.id).then((res) => {

            let utente = res.data;

            console.log("stampo il cristiano recuperato " + JSON.stringify(utente));

            this.setState({
                nomeUtente: utente.nomeUtente, password: utente.password,
                dataCreazione: utente.dataCreazione, idProfiloUtente: utente.profiloUtenteId,
                abilitato: utente.abilitato
            });


            UtentiDataService.mostraProfiliUtente().then((res) => {

                this.setState({ utenze: res.data });
                console.log("stampo il response.data " + JSON.stringify(res.data));

                for (var i = 0; i < this.state.utenze.length; i++) {
                    /*if(){
                        delegare a questo if la creazione di un campo option
                        con la voce selezionata [selected = 'selected']
                    }*/
                    if(this.state.utenze[i].id == this.state.idProfiloUtente.id){

                        //console.log("check!")
                        $('#dropdown-content').append(
                            "<option selected='selected' value='" + JSON.stringify(this.state.utenze[i]) +
                            "' name='utenza'>" + this.state.utenze[i].nomeProfilo + "</option>"
                        );

                    }
                    else{
                        $('#dropdown-content').append(
                            "<option value='" + JSON.stringify(this.state.utenze[i]) +
                            "' name='utenza'>" + this.state.utenze[i].nomeProfilo + "</option>"
                        );
                    }
                }

                console.log("stampo utenze: " + JSON.stringify(this.state.utenze));
            });

        });

    }


    salvaUtente = (e) => {

        let utente = {

            nomeUtente: this.state.nomeUtente, password: this.state.password,
            dataCreazione: this.state.dataCreazione, profiloUtenteId: JSON.parse(this.state.utenza)
        }

        UtentiDataService.updateUtente(utente, this.state.id).then((res) => {

            console.log("stampo il response.data: " + JSON.stringify(res.data));
            this.props.history.push("/lista-utenti");

        });


    }

    onSubmit = (e) => {

        e.preventDefault();
    }

    tornaIndietro() {

        this.props.history.push("/lista-utenti");
    }

    changeUsernameHandler = (event) => {

        this.setState({ nomeUtente: event.target.value })
    }

    changePasswordHandler = (event) => {

        this.setState({ password: event.target.value });
    }


    getVal = (event) => {

        this.setState({ utenza: event.target.value });
    }

    abilitaUtente(id) {

        localStorage.setItem("idUtente", id);
        UtentiDataService.abilita(id).then((res) => {

            //this.setState({ utenti: this.state.utenti.filter(utente => utente.id !== id) });
            this.props.history.push('/lista-utenti');

        });


    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Modifica Credenziali Utente</h3>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label>Username: </label>
                                        <input placeholder="Username" name="nomeUtente" className="form-control"
                                            value={this.state.nomeUtente} onChange={this.changeUsernameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Password: </label>
                                        <input type="text" placeholder="Password" name="password" className="form-control"
                                            value={this.state.password} onChange={this.changePasswordHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Utenza: </label>
                                        <div className="mb-3">
                                            <select id='dropdown-content' onChange={this.getVal} className='form-select form-select-lg mb-3' name='ruolo'>
                                                <option value=''></option>
                                            </select>
                                        </div>
                                    </div>
                                    {!this.state.abilitato ?

                                        (<button onClick={() => this.abilitaUtente(this.state.id)}>Abilita</button>)
                                        : ""}

                                    {this.state.abilitato ?
                                        (<button onClick={() => this.abilitaUtente(this.state.id)}>Disabilita</button>)
                                        : ""}
                                    <button onClick={() => this.salvaUtente()}>Salva Modifiche</button>
                                    <button onClick={() => this.tornaIndietro()} style={{ marginLeft: "10px" }}>Indietro</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModificaUtente;