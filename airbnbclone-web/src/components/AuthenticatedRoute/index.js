import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../Helpers/Auth";
import { AuthContext } from "../../Context/AuthContext";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";

export default ({ component: Component, ...rest }) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (authenticated) {
    if (loading) {
      return <img src={logo} className={styles.loader} />;
    } else return <Route {...rest} component={Component} />;
  } else {
    return <Redirect to="/login" />;
  }
};
