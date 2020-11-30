import React from "react";

class Registro extends React.Component {
  nombreRef = React.createRef();

  avanzar = () => {
    // this.props.history.push({ pathname: "pregunta1" });
    if (!this.nombreRef.current.value) {
      alert("Debes ingresar un nombre");
      return false;
    }
    console.log(this.state.participar);
  };

  toggleParticipar = () => {
    var participar = this.state.participar;
    this.setState({ participar: !participar });
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
          <input type="text" ref={this.nombreRef} />
          Tengo micrófono y quiero participar:
          <div className="checkbox" onClick={this.toggleParticipar}>
            {this.state.participar && <span>X</span>}
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
