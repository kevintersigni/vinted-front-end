import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <div>
          <img src={Logo} alt="photo de l'offre avec tel id"></img>
        </div>
      </Link>
      <Link to="/signup">
        <button>S'inscrire</button>
      </Link>
      <Link to="/login">
        <button>Se connecter</button>
      </Link>

      <button>Vends tes articles</button>
    </header>
  );
};

export default Header;
