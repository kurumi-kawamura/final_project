import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import GlobalStyle from "./GlobalStyle";


function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Switch>
        <Route exact to="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
