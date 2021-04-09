import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./home/Homepage";
import GlobalStyle from "./GlobalStyle";
import About from "./about/index";
import Map from "./map/index";
import SignIn from "./signIn/index";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/map">
          <Map />
        </Route>
        <Route exact path="/signIn">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
