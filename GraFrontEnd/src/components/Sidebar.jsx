import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {

      utenteLoggato: localStorage.getItem("idProfiloUtente")

    }


  }


  render() {
    return (
      <Menu>

        <a className="menu-item">Utenti</a><hr />

        {this.state.utenteLoggato === "1" ?

          (<a className="menu-item" href="/ricerca-utente">Avvia Ricerca Utenti</a>)
          : ""}

        {this.state.utenteLoggato === "1" ?

          (<a className="menu-item" href="/lista-utenti">Lista Utenti</a>)
          : ""}

        {this.state.utenteLoggato === "1" ?

          (<a className="menu-item" href="/crea-utente">Aggiungi Nuovo<hr/></a>)
          : ""}


        <a className="menu-item" >Dipendenti</a><hr />
        <a className="menu-item" href="/ricerca-dipendente">Avvia Ricerca Dipendente</a>
        <a className="menu-item" href="/lista-dipendenti">Lista Dipendenti</a>
        {this.state.utenteLoggato === "1" ?
        (<a className="menu-item" href="/crea-nuovo">Aggiungi Nuovo</a>)
        : ""}

      </Menu>
    );
  };

}

export default Sidebar;