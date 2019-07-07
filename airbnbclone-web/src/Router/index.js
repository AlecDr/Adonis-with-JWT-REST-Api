import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Page404, RegisterPage, LoginPage, MapPage } from "../Pages";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import Navbar from "../components/Navbar";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <UnauthenticatedRoute exact path="/register" component={RegisterPage} />
        <UnauthenticatedRoute exact path="/login" component={LoginPage} />
        <AuthenticatedRoute exact path="/map" component={MapPage} />
        <Route path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
