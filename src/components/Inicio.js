import React from "react";

class Inicio extends React.Component {
  state: {
    userInfo: {},
  };

  avanzar = () => {
    this.props.history.push({ pathname: "registro" });
  };

  componentDidMount() {}

  // prende el loader antes de cargar el componente
  constructor(props) {
    super(props);
    this.state = { loader: false };
  }

  render() {
    return (
      <>
        <div className="titulo master">CPV</div>
        <div className="instrucciones">
          Ajustá el tamaño y zoom del navegador para que coincida con el borde
          rojo. Luego movvelo al espacio designado en la presentación.
        </div>
        <div className="boton" onClick={this.avanzar}>
          Ingresar
        </div>
      </>
    );
  }
}

export default Inicio;
