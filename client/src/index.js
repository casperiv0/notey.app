import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import { Provider } from "react-redux";
import store from "./utils/store";
import * as serviceWorker from "./utils/serviceWorker";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const App = lazy(() => import("./pages/App"));
const NotFound = lazy(() => import("./components/NotFound"));
const renderLoader = () => <p></p>;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={renderLoader()}>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <AuthRoute path="/" exact component={App} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("app-mount")
);

serviceWorker.register();
