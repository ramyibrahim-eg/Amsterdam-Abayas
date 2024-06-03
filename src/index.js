import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./components/globalStyle/GlobalStyle";
import "./Lang";
import { AppProvider } from "./components/context/AppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ToastContainer />
        <App />
      </AppProvider>
      <GlobalStyles />
    </BrowserRouter>
  </React.StrictMode>
);
