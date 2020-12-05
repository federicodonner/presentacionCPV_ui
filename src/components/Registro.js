import React from "react";
import { accederAPI, guardarEnLS } from "../utils/fetchFunctions";

class Registro extends React.Component {
  nombreRef = React.createRef();

  avanzar = () => {
    // this.props.history.push({ pathname: "pregunta1" });
    if (!this.nombreRef.current.value) {
      alert("Debes ingresar un nombre");
      return false;
    }
    var data = {
      nombre: this.nombreRef.current.value,
      participa: this.state.participa + 1 - 1,
    };
    accederAPI(
      "POST",
      "registro",
      data,
      this.exitoRegistro,
      this.errorRegistro
    );
  };

  errorRegistro = (error) => {
    alert(error.detail);
  };

  // Cuando el usuario se registra, la API confirma el número de usuario
  // Se guarda en LS para saber si le toca ser uno de los participantes
  exitoRegistro = (respuesta) => {
    guardarEnLS("presentacionCPV", respuesta.id);
    this.props.history.push({ pathname: "actividad" });
  };

  toggleParticipa = () => {
    var participar = this.state.participa;
    this.setState({ participa: !participar });
  };

  componentDidMount() {
    this.setState({ participar: false });
  }

  // prende el loader antes de cargar el componente
  constructor(props) {
    super(props);
    this.state = { loader: false };
  }

  render() {
    return (
      <>
        <div className="titulo">Registro</div>
        <div className="instrucciones">
          Nombre:
          <input type="text" className="inputText" ref={this.nombreRef} />
          Tengo micrófono y quiero participar:
          <div className="checkbox" onClick={this.toggleParticipa}>
            {this.state.participa && <span>X</span>}
          </div>
        </div>
        <div className="boton" onClick={this.avanzar}>
          Aceptar
        </div>
      </>
    );
  }
}

export default Registro;
