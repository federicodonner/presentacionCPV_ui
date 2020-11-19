import React from "react";
import "./home.css";

class Home extends React.Component {
  state: {
    userInfo: {},
  };

  componentDidMount() {
    console.log("estoy en home");
  }

  // prende el loader antes de cargar el componente
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          {this.state && this.state.loader.encendido && (
            <div className="loader-container">
              <p>
                <img className="loader" src="/images/loader.svg" />
              </p>
              <p className={"negrita"}>{this.state.loader.texto}</p>
            </div>
          )}
          {this.state && !this.state.loader.encendido && <></>}
        </div>
      </div>
    );
  }
}

export default Home;
