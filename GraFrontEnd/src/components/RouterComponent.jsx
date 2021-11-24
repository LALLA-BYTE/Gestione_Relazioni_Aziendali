import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Col, Row } from 'react-bootstrap';
import ListaDipendenti from './ListaDipendenti';
import CreaDipendente from './CreaDipendente';
import ModificaDipendente from './ModificaDipendente';
import ListaUtenti from './ListaUtenti';
import ModificaUtente from './ModificaUtente';
import CreaUtenza from './CreaUtenza';
import RicercaDipendente from './RicercaDipendente';
import RicercaUtente from './RicercaUtente';
import NavbarComponent from './NavbarComponent';
import LogIn from './LogIn';
import Sidebar from './Sidebar';
import HomePage from './HomePage';



class RouterComponent extends Component {


    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact component={LogIn}></Route>
                        <Route path="/login" component={LogIn}></Route>
                        <>
                            <NavbarComponent />
                            <Sidebar />
                            <Route path="/homepage" exact component={HomePage}></Route>
                            <Route path="/ricerca-dipendente" component={RicercaDipendente}></Route>
                            <Route path="/ricerca-utente" component={RicercaUtente}></Route>
                            <Route path="/modifica-dipendente" component={ModificaDipendente}></Route>
                            <Route path="/lista-dipendenti" component={ListaDipendenti}></Route>
                            <Route path="/crea-nuovo" component={CreaDipendente}></Route>
                            <Route path="/crea-utente" component={CreaUtenza}></Route>
                            <Route path="/lista-utenti" component={ListaUtenti}></Route>
                            <Route path="/modifica-utente" component={ModificaUtente}></Route>
                        </>
                    </Switch>
                   
                </Router>

            </div>
        );
    }
}

export default RouterComponent;