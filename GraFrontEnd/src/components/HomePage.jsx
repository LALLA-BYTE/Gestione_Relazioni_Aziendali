import React, { Component } from 'react';


class HomePage extends Component {
constructor(props){
super(props)

 this.state = {

    utenteLoggato: localStorage.getItem("idProfiloUtente")
 }


 if(this.state.utenteLoggato == null){
   
    console.log("entro nell'if della HOMEPAGE");
    this.props.history.push("/login");

 }

}
    render() {
        return (
            <div>
                <div> 
                    <img id= "img-homepage" src = "https://vitolavecchia.altervista.org/wp-content/uploads/2020/01/Risorse-umane-Valutazione-del-potenziale-e-della-carriera-dei-dipendenti-in-azienda.png" style = {{height: "25%"}}alt= '' />
                </div>
            </div>
        );
    }

    

}

export default HomePage;