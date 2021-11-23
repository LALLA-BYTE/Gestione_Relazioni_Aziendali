import React, { Component } from 'react';
import { withRouter } from 'react-router';

class NavbarComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {


        }

        this.logout = this.logout.bind(this);

    }

    logout() {

        console.log("Entri qui anche se nessuno te lo ha chiesto?")
        localStorage.clear("idProfiloUtente");
        this.props.history.push("/");

    }
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid" id="header">
                            <div className="navbar-logo-app">
                                {/*<a className="navbar-brand" href={"/homepage"}>
                                <img src="https://www.gm-servizi.it/wp-content/uploads/2017/06/Logo-GM-Servizi-trasparente-300x208-e1497041735285.png" alt="" width="30" height="24"/>
                              </a>*/}
                               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li>
                                    <a className="navbar-brand" href = {"/homepage"}>GESTIONE RISORSE AZIENDALI</a>
                                    </li>
                                </ul>
                            </div>
                            <div id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li>
                                        <a className="navbar-brand" style={{ marginLeft: "left:80px" }} onClick={() => this.logout()}>LOGOUT</a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default withRouter(NavbarComponent);