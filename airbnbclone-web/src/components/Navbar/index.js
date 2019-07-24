import React, { useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { isAuthenticated, logout } from "../../Helpers/Auth";

export default withRouter(props => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) setAuthenticated(true);
    else setAuthenticated(false);
  }, []);

  let exit = () => {
    logout();
    props.history.push("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.group}>
        <Link to="/map" className={styles.item}>
          Home
        </Link>
      </div>
      {authenticated ? (
        <div className={styles.group}>
          <Link to="/map" className={styles.item}>
            Map
          </Link>
          <div onClick={exit} className={styles.item}>
            Logout
          </div>
        </div>
      ) : (
        <div className={styles.group}>
          <Link to="/login" className={styles.item}>
            Login
          </Link>
          <Link to="/register" className={styles.item}>
            Register
          </Link>
        </div>
      )}
    </div>
  );
});
