import React, { Component } from 'react';
import DipendentiDataService from '../service/DipendentiDataService';

class ListaDipendenti extends Component {
  constructor(props) {

    console.log("sono dentro lista dip")

    super(props)

    this.state = {

      utenteLoggato: localStorage.getItem("idProfiloUtente"),
      dipendenti: []
    }

    console.log("stampo il profiloid " + this.state.utenteLoggato)

    this.creaDipendente = this.creaDipendente.bind(this);
    this.modificaDipendente = this.modificaDipendente.bind(this);
    this.eliminaDipendente = this.eliminaDipendente.bind(this);
    this.ViewDipendente = this.ViewDipendente.bind(this);

    
    if(this.state.utenteLoggato === null){
      this.props.history.push('/login');
    }
  }


  componentDidMount() {
    DipendentiDataService.getAllDip().then((res) => {

      this.setState({ dipendenti: res.data });

    });

  }

  ViewDipendente(id) {

    this.props.history.push(`/visualizza/${id}`);

  }

  creaDipendente() {
    this.props.history.push('/crea-nuovo');
  }

  modificaDipendente(id) {

    localStorage.setItem("idDip", id);
    console.log("stampo localstorage dopo del set " + localStorage.getItem("idDip"));

    this.props.history.push('modifica-dipendente');
  }

  eliminaDipendente(id) {

    console.log("entri nell'elimina dipendente? id dipendente = " + id);
    DipendentiDataService.deleteDip(id).then(res => {
      this.setState({ dipendenti: this.state.dipendenti.filter(dipendente => dipendente.id !== id) });
    });
  
  }


  render() {
    return (
      <div>
        <h2 className="text-center">Lista Dipendenti</h2>
        <div className="row">
          <div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cognome</th>
                  <th>Data di assunzione</th>
                  <th>Data di nascita</th>
                  <th>Reparto</th>
                  <th>Ruolo</th>
                  <th>Ferie Godute</th>

                  {this.state.utenteLoggato === "1" ?
                    (<th>Azioni</th>)
                    : null}
                </tr>

              </thead>
              <tbody>
                {
                  this.state.dipendenti.map(
                    dipendente =>
                      <tr key={dipendente.id}>
                        <td>{dipendente.nome}</td>
                        <td>{dipendente.cognome}</td>
                        <td>{dipendente.dataAssunzione}</td>
                        <td>{dipendente.dataNascita}</td>
                        <td>{dipendente.reparto}</td>
                        <td>{dipendente.idRuolo.nomeRuolo}</td>
                        <td>{dipendente.ferieGodute}</td>
                        {this.state.utenteLoggato === "1" ?
                          (<td>
                            <button onClick={() => this.modificaDipendente(dipendente.id)}>Modifica</button>
                            <button style={{ marginLeft: "10px" }} onClick={() => this.eliminaDipendente(dipendente.id)}>Elimina</button>
                          </td>)
                          : null}
                      </tr>

                  )

                }

              </tbody>
            </table>
          </div>
          <div>
            {this.state.utenteLoggato === "1" ?
              (<button style={{ marginLeft: "10px" }} onClick={this.creaDipendente}>Aggiungi dipendente</button>)
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ListaDipendenti;