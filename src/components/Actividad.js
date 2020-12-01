import React from "react";
import Pusher from "pusher-js";
import { leerDesdeLS } from "../utils/fetchFunctions";

class Actividad extends React.Component {
  state: {};

  esperando = () => {
    this.setState({ esperando: true, actividad: null });
  };

  actividad = (data) => {
    // procesa los actores para sacarle la etiqueta del objeto
    // que envía la API
    var actoresProcesado = [];
    data.actores.forEach((actor) => {
      actoresProcesado.push(actor.id);
    });
    data.actoresProcesado = actoresProcesado;
    this.setState({ actividad: data, esperando: false });
  };

  componentDidMount() {
    this.setState({ numeroParticipante: leerDesdeLS("presentacionCPV") });
    var pusher = new Pusher("57e880a09cb967a7829c", {
      cluster: "us2",
    });

    var channel = pusher.subscribe("actividades");
    channel.bind("esperando", (data) => {
      this.esperando();
    });

    var channel = pusher.subscribe("actividades");
    channel.bind("actividad", (data) => {
      this.actividad(data);
    });
  }

  constructor(props) {
    super(props);
    this.state = { esperando: true };
  }

  render() {
    return (
      <>
        {this.state.esperando && (
          <div className="instrucciones">Esperando la siguiente actividad.</div>
        )}
        {!this.state.esperando &&
          this.state.actividad.actoresProcesado.indexOf(
            this.state.numeroParticipante
          ) == 0 && <span>soy actor el primer actor</span>}
        {!this.state.esperando &&
          this.state.actividad.actoresProcesado.indexOf(
            this.state.numeroParticipante
          ) == 1 && <span>soy actor el segundo actor</span>}
        {!this.state.esperando &&
          this.state.actividad.actoresProcesado.indexOf(
            this.state.numeroParticipante
          ) == -1 && <span>no soy actor</span>}
      </>
    );
  }
}

export default Actividad;
