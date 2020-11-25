import React from "react";

class Pregunta1 extends React.Component {
  state: {
    userInfo: {},
  };

  navegarAUno = () => {
    console.log("navegar a uno");
  };

  componentDidMount() {
    console.log("estoy en pregunta1");
  }

  // prende el loader antes de cargar el componente
  constructor(props) {
    super(props);
    this.state = { loader: false };
  }

  render() {
    return <div>Estoy en PRegunta 1</div>;
  }
}

export default Pregunta1;
