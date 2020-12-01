import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Inicio from "./Inicio";
import Registro from "./Registro";
import Actividad from "./Actividad";
import NotFound from "./NotFound";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/actividad" component={Actividad} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
