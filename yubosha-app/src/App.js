import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import GlobalStyle from "./GlobalStyle";
import About from "./components/about/index";
import Map from "./components/map/index";
import SignIn from "./components/signIn/index";
import CreateAcc from "./components/signIn/CreateAcc";
import ContactUs from "./components/contactUs/index";
import Shop from "./components/shop/index";
import Item from "./components/shop/Item";
import Cart from "./components/shop/Cart";
import CheckOut from "./components/shop/CheckOut";
import Sucess from "./components/shop/Sucess";
import Cancel from "./components/shop/Cancel";

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
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/shop/:_id">
          <Item />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/success">
          <Sucess />
        </Route>
        <Route exact path="/cancel">
          <Cancel />
        </Route>
        <Route exact path="/checkout">
          <CheckOut />
        </Route>
        <Route exact path="/contactUs">
          <ContactUs />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
