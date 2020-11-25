import React from "react";

class Inicio extends React.Component {
  state: {
    userInfo: {},
  };

  navegarAUno = () => {
    this.props.history.push({ pathname: "pregunta1" });
  };

  componentDidMount() {
    console.log("estoy en inicio");
  }

  // prende el loader antes de cargar el componente
  constructor(props) {
    super(props);
    this.state = { loader: false };
  }

  render() {
    return <div>Estoy en Inicio</div>;
  }
}

export default Inicio;
