import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers";
import { createRoot } from "react-dom/client";

const store = createStore(Reducers, compose(applyMiddleware(thunk)));

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
