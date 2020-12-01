import React from "react";
import Router from "./Router";

class Home extends React.Component {
  state: {
    userInfo: {},
  };

  navegarAPregunta = (pregunta) => {
    window.location.assign("/pregunta" + pregunta);
  };

  componentDidMount() {}

  // prende el loader antes de cargar el componente
  constructor(props) {
    super(props);
    this.state = { loader: false };
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          {this.state && this.state.loader && (
            <div className="loader-container">
              <p>
                <img className="loader" src="/images/loader.svg" />
              </p>
              <p className={"negrita"}>CARGANDO</p>
            </div>
          )}
          {this.state && !this.state.loader && (
            <div className="content">
              <Router />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
