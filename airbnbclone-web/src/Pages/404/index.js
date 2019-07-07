import React from "react";
import { Link } from "react-router-dom";
import { Ghost } from "react-kawaii";
import { isAuthenticated } from "../../Helpers/Auth";
import styles from "./styles.module.css";

const Page404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ghost}>
        <Ghost color="#964570" size={300} mood="ko" />
      </div>
      <p>Page not found!</p>
      {isAuthenticated() ? (
        <Link to="/map" className={styles.link}>
          Back to home
        </Link>
      ) : (
        <div className="links">
          <Link to="/login" className={styles.link}>
            Login now
          </Link>
          <span> - </span>
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page404;
