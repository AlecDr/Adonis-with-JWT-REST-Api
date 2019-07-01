import React from "react";
import { Link } from "react-router-dom";
import { Ghost } from "react-kawaii";
import "./styles.css";

const Page404 = () => {
  return (
    <div className="container">
      <div className="ghost">
        <Ghost size={300} mood="ko" />
      </div>
      <p>Page not found!</p>
      <Link to="/maps" className="link">
        Back to home
      </Link>
    </div>
  );
};

export default Page404;
