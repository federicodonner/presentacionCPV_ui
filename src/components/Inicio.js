import React from "react";
import { leerDesdeLS } from "../utils/fetchFunctions";

class Inicio extends React.Component {
  state: {
    userInfo: {},
  };

  avanzar = () => {
    this.props.history.push({ pathname: "registro" });
  };

  componentDidMount() {
    // Verifica que no se haya logueado antes
    if (leerDesdeLS("presentacionCPV")) {
      this.props.history.push({ pathname: "actividad" });
    }
  }

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
          Listo
        </div>
      </>
    );
  }
}

export default Inicio;
