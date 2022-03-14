import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore} from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { App } from "./components/App";
import reducers from "./reducers";
import store from './store'



ReactDOM.render(
  <Provider
    store={store}
  >
    <App />
  </Provider>,
  document.querySelector("#root")
);
