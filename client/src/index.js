import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import { Provider } from "react-redux";
import store from "./utils/store";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./components/notfound/NotFound";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <AuthRoute path="/" exact component={App} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("app-mount")
);
