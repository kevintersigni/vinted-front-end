import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
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
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
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
    <div className="signup-page">
      <div className="signup-container">
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
              <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
            </div>
            <p className="privacy">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        <a href="/login">Tu as déjà un compte ? Connecte-toi !</a>
      </div>
    </div>
  );
};

export default Signup;
