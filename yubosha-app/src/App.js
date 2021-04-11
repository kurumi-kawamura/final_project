import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import GlobalStyle from "./GlobalStyle";
import About from "./components/about/index";
import Map from "./components/map/index";
import SignIn from "./components/signIn/index";
import CreateAcc from "./components/signIn/CreateAcc";
import ContactUs from "./components/contactUs/index";

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
        <Route exact path="/createAcc">
          <CreateAcc />
        </Route>
        <Route exact path="/contactUs">
          <ContactUs />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
