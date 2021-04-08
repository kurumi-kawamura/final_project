import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact to="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
