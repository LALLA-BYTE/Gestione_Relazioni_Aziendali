import React, { Component } from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <footer className="footer fixed-bottom">
                    <span id= "logo-footer">
                        <a><img src="https://www.gm-servizi.it/wp-content/uploads/2017/06/Logo-GM-Servizi-trasparente-300x208-e1497041735285.png" alt="" width="30" height="24"/></a>
                    </span>
                    <span className="text-muted"> Gm Servizi - All Rights Reserved</span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;