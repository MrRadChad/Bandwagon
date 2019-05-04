import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Store } from "./Store/Store";
import Scrolltotop from "./common/util/scrolltotop";

const store = Store();

const rootEL = document.getElementById("root");

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Scrolltotop>
          <App />
          <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
        </Scrolltotop>
      </Router>
    </Provider>
    , rootEL
  );
};

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    setTimeout(render);
  });
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
