import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import "./index.css";

import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,

  document.getElementById("app") // make sure this is the same as the id of the div in your index.html
);
