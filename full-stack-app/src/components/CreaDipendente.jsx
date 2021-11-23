import React, { Component } from 'react';
import $ from "jquery";
import DipendentiDataService from '../service/DipendentiDataService';

class CreaDipendente extends Component {
    constructor(props) {
        super(props)

        this.state = {

            utenteLoggato: localStorage.getItem("idProfiloUtente"),
            id: this.props.match.params.id,
            nome: '',
            cognome: '',
            dataAssunzione: '',
            dataNascita: '',
            reparto: '',
            ruoli: [],
            ruolo: null,
            
        }

        this.changeNomeHandler = this.changeNomeHandler.bind(this);
        this.changeCognomeHandler = this.changeCognomeHandler.bind(this);
        this.changeDataAssunzioneHandler = this.changeDataAssunzioneHandler.bind(this);
        this.changeDataNascitaHandler = this.changeDataNascitaHandler.bind(this);
        this.changeRepartoHandler = this.changeRepartoHandler.bind(this);
        this.changeRuoloHandler = this.changeRuoloHandler.bind(this);
        this.salvaDipendente = this.salvaDipendente.bind(this);
        this.getVal = this.getVal.bind(this);

        if(this.state.utenteLoggato != "1" || this.state.utenteLoggato == null){
            this.props.history.push('/login');
        }
    
    }

    componentDidMount() {
       

        DipendentiDataService.getRuoli().then((response) => {
            this.setState({ ruoli: response.data });
            console.log("stampo il responde.data " + JSON.stringify(response.data));
            console.log(this.state.ruoli);
        
            for (var i = 0; i < this.state.ruoli.length; i++) {
                $('#dropdown-content').append(
                    "<option value=" + JSON.stringify(this.state.ruoli[i]) +
                    " name='ruolo'>" + this.state.ruoli[i].nomeRuolo + "</option>"
                );
            }

            console.log("stampo ruoli: " + this.state.ruoli);
        });

    }


    salvaDipendente = (e) => {
        e.preventDefault();

        let errore = false;
    
        if(this.state.nome=== ""){
         $("#nome").css("border", "5px solid red");
         $("#err_msg_nome").text("questo campo è obbligatorio").css({color: "#a30505"});
            errore = true;
        }if(this.state.cognome === ""){
         $("#cognome").css("border", "5px solid red");  
         $("#err_msg_cognome").text("questo campo è obbligatorio").css({color: "#a30505"});
            errore = true;

        } if(this.state.dataAssunzione === ""){
            $("#dataAssunzione").css("border", "5px solid red");
            $("#err_msg_dataAssunzione").text("questo campo è obbligatorio").css({color: "#a30505"});
            errore = true;

        } if(this.state.dataNascita === ""){
            $("#dataNascita").css("border", "5px solid red");
            $("#err_msg_dataNascita").text("questo campo è obbligatorio").css({color: "#a30505"});
            errore = true;

        }if(this.state.reparto === ""){
            $("#reparto").css("border", "5px solid red");
            $("#err_msg_reparto").text("questo campo è obbligatorio").css({color: "#a30505"});
            errore = true;

        } if(this.state.ruolo === ""){
           
            $("#err_msg_ruolo").text("questo campo è obbligatorio").css({color: "#a30505"});
            errore = true;
        } 

        if(errore == true){

            return;
        }

        let dipendente = {
            nome: this.state.nome, cognome: this.state.cognome, dataAssunzione: this.state.dataAssunzione,
            dataNascita: this.state.dataNascita, reparto: this.state.reparto, idRuolo: JSON.parse(this.state.ruolo)
        };
        console.log('dipendente =>' + JSON.stringify(dipendente));

        DipendentiDataService.createDip(dipendente).then(res => {
            console.log("stampo il response.data: " + JSON.stringify(res.data));
            this.props.history.push("/lista-dipendenti");
        });


    }


    tornaIndietro() {
        this.props.history.push("/homepage");
    }

    changeNomeHandler = (event) => {

        this.setState({ nome: event.target.value });
    }

    changeCognomeHandler = (event) => {

        this.setState({ cognome: event.target.value });
    }

    changeDataAssunzioneHandler = (event) => {

        this.setState({ dataAssunzione: event.target.value });
    }

    changeDataNascitaHandler = (event) => {

        this.setState({ dataNascita: event.target.value });
    }

    changeRepartoHandler = (event) => {

        console.log("facciamo un analisi del reparto: " + JSON.stringify(event.target.value))
        this.setState({ reparto: event.target.value });
    }

    changeRuoloHandler = (event) => {

        this.setState({ ruolo: event.target.value });
    }

    getVal = (sel) =>{

        this.setState({ruolo: sel.target.value})
       
        console.log("facciamo un analisi del ruolo nello state (asincrono): " + JSON.stringify(this.state.ruolo))

    }

    

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Aggiungi Nuovo Dipendente</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <input placeholder="Nome*" id="nome" name="nome" className="form-control"
                                            value={this.state.nome} onChange={this.changeNomeHandler}/>
                                    </div>
                                    <div id= "err_msg_nome"> 
                                    </div>
                                    <div className="form-group">
                                        <input placeholder="Cognome*" name="cognome" className="form-control"
                                            value={this.state.cognome} onChange={this.changeCognomeHandler} />
                                    </div>
                                    <div id= "err_msg_cognome"> 
                                    </div>
                                    <div className="form-group">
                                        <input type="date" placeholder="Data di assunzione*" name="dataAssunzione" className="form-control"
                                            value={this.state.dataAssunzione} onChange={this.changeDataAssunzioneHandler} />
                                    </div>
                                    <div id= "err_msg_dataAssunzione"> 
                                    </div>
                                    <div className="form-group">
                                        <input type="date" placeholder="Data di nascita*" name="dataNascita" className="form-control"
                                            value={this.state.dataNascita} onChange={this.changeDataNascitaHandler} />
                                    </div>
                                    <div id= "err_msg_dataNascita"> 
                                    </div>
                                    <div className="form-group">
                                        <input placeholder="Reparto" name="reparto*" className="form-control"
                                            value={this.state.reparto} onChange={this.changeRepartoHandler} />
                                    </div>
                                    <div id= "err_msg_reparto"> 
                                    </div>
                                    <div className="mb-3">
                                        <select id='dropdown-content' onChange ={this.getVal} className='form-select form-select-lg mb-3' name='ruolo'>
                                            <option value= ''></option>
                                        </select>   
                                    </div>
                                    <div id= "err_msg_ruolo"> 
                                    </div>
                                    <div>
                                        <button onClick={this.salvaDipendente}>Salva</button>
                                        <button onClick={this.tornaIndietro.bind(this)} style={{ marginLeft: "10px" }}>Indietro</button>
                                    </div>
                                </form>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export default CreaDipendente;