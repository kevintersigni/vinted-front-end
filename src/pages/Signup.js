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
    <div>
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
        <input id="newsletter" type="checkbox" />
        <label htmlFor="newsletter">S'inscrire à la newsletter</label>
        <p className="privacy">Blabbla</p>
        <button type="submit">S'inscrire</button>
      </form>
      <a href="#">Tu as déjà un compte ? Connecte-toi !</a>
    </div>
  );
};

export default Signup;
