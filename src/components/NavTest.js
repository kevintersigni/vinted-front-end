import React from "react";
import { Link } from "react-router-dom";

const NavTest = () => {
  const id = 723;

  return (
    <nav>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to={`/offer/${id}`}>Offer {id}</Link>
      </li>
    </nav>
  );
};

export default NavTest;
