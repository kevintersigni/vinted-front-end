import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Login = (props) => {
  const { handleLogin } = props;

  const history = useHistory();
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "https://my-backend-project-vinted.herokuapp.com/user/login",
      {
        email: email,
        password: password,
      }
    );
    console.log(response.data.token);
    if (response.data.token) {
      handleLogin(response.data.token);
      return history.push("/publish");
    } else {
      alert("Une erreur est survenue, veuillez rééessayer.");
    }
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
