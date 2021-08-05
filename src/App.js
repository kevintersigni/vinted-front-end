import "./App.css";
import "react-toggle/style.css";
import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Offer from "./pages/Offer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faCheckCircle);

function App() {
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || "");

  const [range, setRange] = useState([0, 200]);
  const [sort, setSort] = useState(false);

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken(token);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleRange = (values) => {
    setRange(values);
  };

  const handleSort = (event) => {
    setSort(event.target.checked);
    console.log(sort);
  };

  return (
    <Router>
      <Header
        token={token}
        handleChange={handleChange}
        range={range}
        handleRange={handleRange}
        sort={sort}
        handleSort={handleSort}
        setToken={setToken}
      />

      <Switch>
        <Route exact path="/">
          <Home title={title} range={range} sort={sort} />
        </Route>

        <Route path="/offer/:id">
          <Offer />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>

        <Route path="/publish">
          <Publish token={token} />
        </Route>

        <Route path="/payment">
          <Payment token={token} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
