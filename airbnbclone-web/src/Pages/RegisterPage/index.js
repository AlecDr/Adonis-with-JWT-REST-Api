import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./styles.module.css";

export default props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className={styles.registerCard}>
      <img className={styles.logo} src={logo} />
      <h2 className={styles.title}>Register</h2>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Name</label>
        <input
          onChange={event => setName(event.target.value)}
          value={name}
          type="text"
          className={styles.input}
        />
      </div>
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
      <button className={[styles.button, styles.registerButton].join(" ")}>
        Register
      </button>
      <hr className={styles.divider} />
      <Link to="/login">
        <button className={[styles.button, styles.loginButton].join(" ")}>
          Login
        </button>
      </Link>
    </div>
  );
};
