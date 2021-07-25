import "./App.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Offer from "./pages/Offer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/offer/:id">
          <Offer />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
