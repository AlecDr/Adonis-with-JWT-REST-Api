import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../Helpers/Auth";

import { AuthContext } from "../../Context/AuthContext";

export default ({ component: Component, ...rest }) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  if (authenticated) {
    return <Route {...rest} component={Component} />;
  } else {
    return <Redirect to="/login" />;
  }
};
