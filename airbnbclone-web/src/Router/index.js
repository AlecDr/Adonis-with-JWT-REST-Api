import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Page404, RegisterPage, LoginPage } from "../Pages";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default Router;
