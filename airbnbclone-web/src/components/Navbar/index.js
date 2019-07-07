import React, { useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { isAuthenticated } from "../../Helpers/Auth";

export default props => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) setAuthenticated(true);
    else setAuthenticated(false);
  }, []);

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
          <Link to="/profile" className={styles.item}>
            Profile
          </Link>
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
};
