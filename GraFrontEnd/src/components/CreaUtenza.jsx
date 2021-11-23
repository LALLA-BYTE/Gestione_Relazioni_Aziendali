import React, { Component } from 'react';
import $ from "jquery";
import UtentiDataService from '../service/UtentiDataService';

class CreaUtenza extends Component {
    constructor(props) {
        super(props)

        this.state = {

            utenteLoggato: localStorage.getItem("idProfiloUtente"),
            nomeUtente: '',
            password: '',
            dataCreazione: '',
            utenze: [],
            utenza: null,
            hidden: true


        }

        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.creaUtente = this.creaUtente.bind(this);
        this.tornaIndietro = this.tornaIndietro.bind(this);

        if(this.state.utenteLoggato != "1" || this.state.utenteLoggato == null){
            this.props.history.push('/login');
        }

    }

    componentDidMount() {

        UtentiDataService.mostraProfiliUtente().then((res) => {

            this.setState({ utenze: res.data });
            console.log("stampo il response.data " + JSON.stringify(res.data));
           
            for (var i = 0; i < this.state.utenze.length; i++) {
               
                $('#dropdown-content').append(
                    "<option value=" + JSON.stringify(this.state.utenze[i]) +
                    " name='utenza'>" + this.state.utenze[i].nomeProfilo + "</option>"
                );
            }

            console.log("stampo utenze: " + JSON.stringify(this.state.utenze));
        });

    }
    onSubmit = (e) => {
        e.preventDefault();

    }

   creaUtente = () => {
    
    let errore = false;
    
    if(this.state.nomeUtente === ""){
     $("#nomeUtente").css("border", "5px solid red");
     $("#err_msg_username").text("questo campo è obbligatorio").css({color: "#a30505"});
        errore = true;
    }if(this.state.password === ""){
     $("#password").css("border", "5px solid red");  
     $("#err_msg_password").text("questo campo è obbligatorio").css({color: "#a30505"});
        errore = true;

    } if(this.state.utenza === ""){
        $("#dropdown-content").css("border", "5px solid red");
        $("#err_msg_utenza").text("questo campo è obbligatorio").css({color: "#a30505"});
        errore = true;
    } 

    if(errore == true){

        return;
    }

    let utente = {
        nomeUtente: this.state.nomeUtente, password: this.state.password, profiloUtenteId: JSON.parse(this.state.utenza)
    };

    console.log('utente prima del richiamo al metodo del service =>' + JSON.stringify(utente));
    UtentiDataService.creaUtente(utente).then(res => {

        console.log("stampo il res.data" + res.data);

        if(res.data == null){
            console.log("stampo il response.data: " + JSON.stringify(res.data));
            this.props.history.push("/lista-utenti");  
        } else {
            $("#ciccio").text("questo Username è già in uso!").css({color: "#a30505"});
        }
        
    });

}

  getVal = (sel) =>{

    this.setState({utenza: sel.target.value})
    
}

tornaIndietro=()=> {
    this.props.history.push("/homepage");
}

changeUsernameHandler = (event) => {

    this.setState({ nomeUtente: event.target.value });
}

changePasswordHandler = (event) => {

    this.setState({ password: event.target.value });
}

azzeraRicerca() {

    this.setState({ nomeUtente: "" });
    this.setState({ password: "" });
    this.setState({ utenza: null });
}

showPassword() {

    this.setState({ hidden: !this.state.hidden });
};


render() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h4 className="text-center" id= "ciccio" style = {{marginTop: "5%"}}>Crea Nuovo Utente<hr/></h4>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input placeholder="Username*" name="nomeUtente" className="form-control"
                                        value={this.state.nomeUtente} onChange={this.changeUsernameHandler}/>
                                </div>
                                <div id = "err_msg_username"> 
                                </div>
                                <div className="form-group">
                                    <label>Password:
                                    <input placeholder="Password*" type={this.state.hidden ? 'password' : 'text'} name="password" className="form-control"
                                        value={this.state.password} onChange={this.changePasswordHandler} />
                                    <button onClick={this.showPassword} style={{ marginTop: "5%"}}>Mostra</button>
                                    </label>
                                </div>
                                <div id = "err_msg_password"> 
                                </div>
                                <div className="form-group">
                                    <label> Tipologia di Utenza*:</label>
                                    <div className="mb-3">
                                        <select id='dropdown-content' onChange={this.getVal} className='form-select form-select-lg mb-3' name='ruolo'>
                                            <option value=''></option>
                                        </select>
                                    </div>
                                    <div id = "err_msg_utenza"> 
                                </div>
                                </div>
                                <button onClick={() => this.creaUtente()}>Salva</button>
                                <button onClick={() =>this.tornaIndietro()} style={{ marginLeft: "10px" }}>Indietro</button>
                            </form>
                        </div>


                    </div>


                </div>
            </div>
        </div>
    );
}

}

export default CreaUtenza;