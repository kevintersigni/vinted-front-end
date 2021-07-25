import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkUser = async () => {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response);
      const token = response.data.token;
      Cookies.set("token", token);
    };
    checkUser();
  };

  return (
    <div className="login-container">
      <h2>Se connecter</h2>

      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmail}
          placeholder="Adresse email"
          value={email}
          type="email"
        />
        <input
          onChange={handlePassword}
          placeholder="Mot de passe"
          value={password}
          type="password"
        />
        <button type="submit">Se connecter</button>
      </form>
      <a href="/signup">Pas encore de compte ? Inscris-toi!</a>
    </div>
  );
};

export default Login;
