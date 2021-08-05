import React, { useState } from "react";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";
import Logo from "../assets/img/logo_minted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Slider, { SliderTooltip } from "rc-slider";

import Toggle from "react-toggle";
import Cookies from "js-cookie";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const Header = (props) => {
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const {
    token,
    setToken,
    handleChange,
    handleRange,
    range,
    sort,
    handleSort,
    value,
    dragging,
    index,
    ...restProps
  } = props;

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
    history.push("/login");
  };

  const handleModalShow = () => {
    setModal(true);
  };
  const handleModalHide = () => {
    setModal(false);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, email, password);

    const checkUser = async () => {
      const response = await axios.post(
        "https://my-backend-project-vinted.herokuapp.com/user/signup",
        {
          email: email,
          password: password,
          username: username,
        }
      );
      console.log(response);
      const token = response.data.token;
      Cookies.set("token", token);
    };
    checkUser();
  };

  return (
    <>
      <header>
        <SliderTooltip
          prefixCls="rc-slider-tooltip"
          overlay={`${value}€`}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </SliderTooltip>

        <Link to="/">
          <img src={Logo} alt="logo"></img>
        </Link>

        <div className="filters">
          <div className="search-container">
            <FontAwesomeIcon icon="search" className="search-icon" />
            <input
              type="search"
              placeholder="Rechercher des articles"
              onChange={handleChange}
            ></input>
          </div>
          <div className="filter-container">
            <div className="sort-container">
              <div className="sort-label">Trier les résultats:</div>
              <Toggle
                defaultChecked={sort}
                icons={{
                  checked: <div></div>,
                  unchecked: <div></div>,
                }}
                onChange={handleSort}
              />
            </div>
            <div className="range-container">
              <div className="range-price-label">Prix entre:</div>
              <Range
                defaultValue={range}
                min={0}
                max={300}
                tipFormatter={(value) => `${value}€`}
                step={1}
                onChange={handleRange}
              />
            </div>
          </div>
        </div>
        {token ? (
          <div>
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>
        ) : (
          <div>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
        )}

        <Link to="/publish">
          <button className="sales-button">Vends tes articles</button>
        </Link>
        <button onClick={handleModalShow}>S'inscrire | Se connecter</button>
      </header>
      {modal && (
        <div className="modal">
          <div className="signup-container2">
            <div className="modal-closer" onClick={handleModalHide}>
              X
            </div>
            <h2>S'inscrire</h2>

            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChangeUsername}
                placeholder="Nom d'utilisateur"
                id="username"
                value={username}
                type="text"
              />
              <input
                onChange={handleChangeEmail}
                placeholder="Email"
                id="email"
                value={email}
                type="email"
              />
              <input
                onChange={handleChangePassword}
                placeholder="Mot de passe"
                id="password"
                value={password}
                type="password"
              />
              <div className="checkbox-container">
                <div>
                  <input id="newsletter" type="checkbox" />
                  <label htmlFor="newsletter">
                    S'inscrire à notre newsletter
                  </label>
                </div>
                <p className="privacy">
                  En m'inscrivant je confirme avoir lu et accepté les Termes &
                  Conditions et Politique de Confidentialité de Vinted. Je
                  confirme avoir au moins 18 ans.
                </p>
              </div>
              <button type="submit">S'inscrire</button>
            </form>
            <a href="/login">Tu as déjà un compte ? Connecte-toi !</a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
