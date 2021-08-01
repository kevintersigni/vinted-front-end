import React from "react";

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

  return (
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
                checked: <div>🔼</div>,
                unchecked: <div>🔽</div>,
              }}
              onChange={handleSort}
            />
          </div>
          <div className="range-container">
            <div className="range-price-label">Prix entre:</div>
            <Range
              defaultValue={range}
              marks={{ 0: "0€", 200: "200€" }}
              max={200}
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
    </header>
  );
};

export default Header;
