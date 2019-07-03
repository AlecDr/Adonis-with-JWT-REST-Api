import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Page404, RegisterPage, LoginPage } from "../Pages";
import AuthRoute from "../components/AuthRoute";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute exact path="/register" component={RegisterPage} />
      <AuthRoute exact path="/login" component={LoginPage} />
      <Route path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default Router;
