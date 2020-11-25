import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Inicio from "./Inicio";
import Pregunta1 from "./Pregunta1";
import NotFound from "./NotFound";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/pregunta1" component={Pregunta1} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
