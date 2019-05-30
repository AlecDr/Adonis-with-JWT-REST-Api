import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

import Routes from "./routes";

const App = () => (
  <PaperProvider>
    <Routes />
  </PaperProvider>
);

export default App;
