import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../Helpers/Auth";

export default ({ component: Component, ...rest }) => {
  if (isAuthenticated()) return <Route {...rest} component={Component} />;
  else return <Redirect to="/login" />;
};
