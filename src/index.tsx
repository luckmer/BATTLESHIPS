import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./css/Global.style";
import { AppProvider } from "./store/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <App />
      <GlobalStyle />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
