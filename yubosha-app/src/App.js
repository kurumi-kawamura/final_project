import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./home/Homepage";
import GlobalStyle from "./GlobalStyle";
import About from "./about/index";
import Map from "./map/index";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact to="/">
          <Homepage />
        </Route>
        <Route exact to="/about">
          <About />
        </Route>
        <Route exact to="/map">
          <Map />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
