import React, { useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { login } from "../../Helpers/Auth";
import logo from "../../assets/images/logo.png";
import styles from "./styles.module.css";
import { AuthContext } from "../../Context/AuthContext";

export default props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuthenticated } = useContext(AuthContext);

  let handleLogin = async event => {
    event.preventDefault();
    setLoading(true);

    if (checkInputs()) {
      try {
        const result = await login({ userEmail: email, password });
        setAuthenticated(true);
        props.history.push("/map");
      } catch (error) {
        showErrorMessage("Something went wrong, try using a different email!");
      }
    } else {
      showErrorMessage("You should provide an email and password!");
    }
  };

  let checkInputs = () => {
    return email.trim().length > 0 && password.trim().length > 0;
  };

  let renderButtonsOrSpinner = () => {
    if (!loading) {
      return (
        <Fragment>
          <button className={[styles.button, styles.loginButton].join(" ")}>
            Login
          </button>
          <hr className={styles.divider} />
          <Link to="/register">
            <button
              type="button"
              className={[styles.button, styles.registerButton].join(" ")}
            >
              Register
            </button>
          </Link>
        </Fragment>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  let showErrorMessage = message => {
    setMessage(message);
    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <img className={styles.logo} src={logo} alt="" />
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
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
    </div>
  );
};
