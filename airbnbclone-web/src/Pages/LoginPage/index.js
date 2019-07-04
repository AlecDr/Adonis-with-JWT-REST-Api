import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../Helpers/Auth";
import logo from "../../assets/images/logo.png";
import styles from "./styles.module.css";

export default props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let login = async event => {
    event.preventDefault();

    if (checkInputs()) {
    } else {
      setMessage("You should provide an email and password!");

      setTimeout(() => setMessage(""), 3000);
    }
  };

  let checkInputs = () => {
    return email.trim().length > 0 && password.trim().length > 0;
  };

  return (
    <div className={styles.registerCard}>
      <img className={styles.logo} src={logo} alt="" />
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={login}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            onChange={event => setEmail(event.target.value)}
            value={email}
            type="email"
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            onChange={event => setPassword(event.target.value)}
            value={password}
            type="password"
            className={styles.input}
          />
        </div>
        <div className={styles.alert}>{message}</div>
        <button className={[styles.button, styles.loginButton].join(" ")}>
          Login
        </button>
      </form>
      <hr className={styles.divider} />
      <Link to="/register">
        <button
          type="button"
          className={[styles.button, styles.registerButton].join(" ")}
        >
          Register
        </button>
      </Link>
    </div>
  );
};
