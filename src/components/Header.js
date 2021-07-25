import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo_minted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  console.log("token");
  return (
    <header>
      <Link to="/">
        <img src={Logo} alt="logo"></img>
      </Link>
      <div className="search-container">
        <FontAwesomeIcon icon="search" className="search-icon" />
        <input type="search" placeholder="Rechercher des articles"></input>
      </div>

      <div>
        <Link to="/signup">
          <button>S'inscrire</button>
        </Link>
        <Link to="/login">
          <button>Se connecter</button>
        </Link>
      </div>

      <button className="sales-button">Vends tes articles</button>
    </header>
  );
};

export default Header;
