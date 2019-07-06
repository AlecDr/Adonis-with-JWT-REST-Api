import React from "react";
import AuthContext from "./Context/AuthContext";
import Router from "./Router";

const App = () => {
  return (
    <AuthContext>
      <Router />
    </AuthContext>
  );
};

export default App;
