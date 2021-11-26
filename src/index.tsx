import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./css/Global.style";
import { AppProvider } from "./data/store";

ReactDOM.render(
  <AppProvider>
    <App />
    <GlobalStyle />
  </AppProvider>,
  document.getElementById("root")
);

reportWebVitals();
