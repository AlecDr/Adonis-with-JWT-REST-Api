import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Page404 } from "../Pages";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default Router;
