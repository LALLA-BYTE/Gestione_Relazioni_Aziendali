import React, { Component } from 'react';
import $ from "jquery";
import UtentiDataService from '../service/UtentiDataService';


class LogIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            hidden: true,
        }

        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.tornaIndietro = this.tornaIndietro.bind(this);
        this.showPassword = this.showPassword.bind(this);

    }


    controlloUtente = () => {

        let user = { nomeUtente: this.state.username, password: this.state.password }

        console.log("stampo il paccheto dati user: " + JSON.stringify(user));

        UtentiDataService.checkUtente(user).then((res) => {


            console.log("stampo il response.data: " + JSON.stringify(res.data));


            if (res.data.nomeUtente != null && res.data.password != null ) {

                localStorage.setItem("idProfiloUtente", res.data.profiloUtenteId.id);
                console.log("stampo idProfiloUtente nel localStorage: " + localStorage.getItem("idProfiloUtente"));
                this.props.history.push("/homepage");
                //&& res.data.abilitato != false

            } else {

                $("#notifica2").text("credenziali errate!").css({ color: "#a30505" });

                //this.setState({ username: "" });
                //this.setState({ password: "" });
            }
                /*if (!res.data.abilitato) {
                this.setState({nomeUtente: ""});
                this.setState({password: ""});
            $("#notifica1").text("Accesso ancora non autorizzato dall'amministratore").css({ color: "#a30505" });*/}
        );
      

       
    } 

changeUsernameHandler = (event) => {

    this.setState({ username: event.target.value });
}

changePasswordHandler = (event) => {

    this.setState({ password: event.target.value });
}

showPassword() {

    this.setState({ hidden: !this.state.hidden });
};

onSubmit = (e) => {
    e.preventDefault();

}

tornaIndietro() {

    this.props.history.push("/");
}

render() {
    return (
        <div className="div-login">
            <div id="notifica1">
                <img id="img_logo" src="https://www.gm-servizi.it/wp-content/uploads/2017/06/Logo-GM-Servizi-trasparente-300x208-e1497041735285.png" alt="GM Servizi srl"
                    data-g1-src-desktop="https://www.gm-servizi.it/wp-content/uploads/2017/06/Logo-GM-Servizi-trasparente-300x208-e1497041735285.png"
                    data-g1-src-desktop-hdpi="https://www.gm-servizi.it/wp-content/uploads/2017/06/Logo-GM-Servizi-trasparente-300x208-e1497041735285.png" />
            </div>
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div id="notifica2">
                    </div>
                    <label>Username:</label>
                    <input placeholder="Username" name="username" onChange={this.changeUsernameHandler} />
                    <label>Password:</label>
                    <input type={this.state.hidden ? 'password' : 'text'} placeholder="Password" name="password" required={true} onChange={this.changePasswordHandler} id="input-psw" />
                    <button style={{ marginTop: "10px" }} onClick={this.showPassword}>Mostra</button>
                    <button style={{ marginTop: "10px" }} onClick={this.controlloUtente.bind(this)}>Accedi</button>
                </form>
            </div>
        </div>

    );
}
}

export default LogIn;