import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";

import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./redux/rootReducer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export type AppState = ReturnType<typeof rootReducer>;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
