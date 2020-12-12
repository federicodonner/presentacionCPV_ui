import React from "react";
import Pusher from "pusher-js";
import { leerDesdeLS } from "../utils/fetchFunctions";

class Actividad extends React.Component {
  state: {};

  esperando = () => {
    this.setState({
      esperando: true,
      actividad: null,
      respuestaIngresada: false,
      opcionSeleccionada: null,
    });
  };

  actividad = (data) => {
    // procesa los actores para sacarle la etiqueta del objeto
    // que envía la API
    var actoresProcesado = [];
    data.actores.forEach((actor) => {
      actoresProcesado.push(actor.id);
    });
    data.actoresProcesado = actoresProcesado;

    var dialogoProcesadoUno = data.guion_jugador_uno.split("\r\n");
    var dialogoProcesadoDos = data.guion_jugador_dos.split("\r\n");
    var dialogoGeneral = [];
    for (
      var i = 0;
      i < Math.max(dialogoProcesadoUno.length, dialogoProcesadoDos.length);
      i++
    ) {
      dialogoGeneral.push(dialogoProcesadoUno[i]);
      dialogoGeneral.push(dialogoProcesadoDos[i]);
    }
    data.dialogoGeneral = dialogoGeneral;

    data.cartasProcesadas = data.cartas.split("\r\n");

    this.setState({
      actividad: data,
      esperando: false,
      respuestaIngresada: false,
      opcionSeleccionada: null,
    });
  };

  // Funnción ejecutada cuando selecciona un radio
  seleccionarRadio = (opcionSeleccionada) => (event) => {
    if (this.state.respuestaIngresada) {
      event.preventDefault();
      return false;
    }
    this.setState({ opcionSeleccionada });
  };

  // Función ejecutada cuando acepta la opción
  responder = () => {
    if (!this.state.opcionSeleccionada) {
      alert("Debes seleccionar una opción");
      return false;
    }

    // Si llego acá es porque seleccionó una opción
    this.setState({ respuestaIngresada: true });
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
          <div className="instrucciones esperando">
            Esperando la siguiente actividad.
          </div>
        )}
        {!this.state.esperando &&
          this.state.actividad.actoresProcesado.indexOf(
            this.state.numeroParticipante
          ) == 0 && (
            <span>
              <div className="tituloPregunta">Sos el jugador A</div>
              <div className="guion">
                {this.state.actividad.dialogoGeneral.map((linea, i) => (
                  <span
                    key={i}
                    className={
                      i % 2 == 0 ? "newLine resaltado" : "newLine noResaltado"
                    }
                  >
                    {linea}
                  </span>
                ))}
              </div>
            </span>
          )}
        {!this.state.esperando &&
          this.state.actividad.actoresProcesado.indexOf(
            this.state.numeroParticipante
          ) == 1 && (
            <span>
              <div className="tituloPregunta">Sos el jugador N</div>
              <div className="guion">
                {this.state.actividad.dialogoGeneral.map((linea, i) => (
                  <span
                    key={i}
                    className={
                      i % 2 == 1 ? "newLine resaltado" : "newLine noResaltado"
                    }
                  >
                    {linea}
                  </span>
                ))}
              </div>
            </span>
          )}
        {!this.state.esperando &&
          this.state.actividad.actoresProcesado.indexOf(
            this.state.numeroParticipante
          ) == 2 && (
            <span>
              <div className="tituloPregunta">Sos el Juez</div>
              <div className="guion">
                Prestá atención a la situación porque vas a tener que dar un
                ruling cuando te llamen.
              </div>
            </span>
          )}
        {!this.state.esperando &&
          this.state.actividad.actoresProcesado.indexOf(
            this.state.numeroParticipante
          ) == -1 && (
            <div>
              <div className="tituloPregunta">
                Situación {this.state.actividad.actividad_numero}
              </div>
              <div className="textoPregunta">
                {this.state.actividad.pregunta}
              </div>
              <div className="radioOpciones">
                <div>
                  <input
                    type="radio"
                    id="opcionUno"
                    name="gender"
                    value="1"
                    className="radioButton"
                    onClick={this.seleccionarRadio(1)}
                  />
                  <label htmlFor="opcionUno" className="radioLabel uno">
                    {this.state.actividad.opcion_uno}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="opcionDos"
                    name="gender"
                    value="2"
                    className="radioButton"
                    onClick={this.seleccionarRadio(2)}
                  />
                  <label htmlFor="opcionDos" className="radioLabel dos">
                    {this.state.actividad.opcion_dos}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="opcionTres"
                    name="gender"
                    value="3"
                    className="radioButton"
                    onClick={this.seleccionarRadio(3)}
                  />
                  <label htmlFor="opcionTres" className="radioLabel tres">
                    {this.state.actividad.opcion_tres}
                  </label>
                </div>
              </div>
              {!this.state.respuestaIngresada && (
                <div className="boton" onClick={this.responder}>
                  Aceptar
                </div>
              )}
              {this.state.respuestaIngresada && (
                <div className="respuesta">
                  {this.state.opcionSeleccionada ==
                    this.state.actividad.respuesta_correcta && (
                    <div>¡Tu respuesta fue correcta!</div>
                  )}
                  {this.state.opcionSeleccionada !=
                    this.state.actividad.respuesta_correcta && (
                    <div>Respuesta incorrecta :(</div>
                  )}
                  {this.state.actividad.explicacion_respuesta}
                </div>
              )}
            </div>
          )}
        {this.state && this.state.actividad && !this.state.actividad.esperando && (
          <div className="cartas">
            <div>----</div>
            <span className="cartasTitulo">Cartas involucradas</span>
            {this.state &&
              this.state.actividad &&
              this.state.actividad.cartasProcesadas.map((carta, i) => (
                <img key={i} className="carta" src={carta} />
              ))}
          </div>
        )}
      </>
    );
  }
}

export default Actividad;
