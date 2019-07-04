import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { register } from "../../Helpers/Auth";
import logo from "../../assets/images/logo.png";
import styles from "./styles.module.css";

export default props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let handleRegister = async event => {
    event.preventDefault();
    setLoading(true);
    if (checkInputs()) {
      try {
        const result = await register({ email, password, username });
        props.history.push("/login");
      } catch (error) {
        showErrorMessage("Something went wrong, try using a different email!");
      }
    } else {
      showErrorMessage("You should provide an email, password and name !");
    }
  };

  let showErrorMessage = message => {
    setMessage(message);
    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  let renderButtonsOrSpinner = () => {
    if (!loading) {
      return (
        <Fragment>
          <button className={[styles.button, styles.registerButton].join(" ")}>
            Register
          </button>
          <hr className={styles.divider} />
          <Link to="/login">
            <button
              type="button"
              className={[styles.button, styles.loginButton].join(" ")}
            >
              Login
            </button>
          </Link>
        </Fragment>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  let checkInputs = () => {
    return (
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      username.trim().length > 0
    );
  };

  return (
    <div className={styles.registerCard}>
      <img className={styles.logo} src={logo} />
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleRegister}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name</label>
          <input
            onChange={event => setUsername(event.target.value)}
            value={username}
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
        <div className={styles.alert}>{message}</div>

        {renderButtonsOrSpinner()}
      </form>
    </div>
  );
};
