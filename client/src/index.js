import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import "./styles/index.css";
import AuthRoute from "./components/AuthRoute";
import store from "./utils/store";
import * as serviceWorker from "./utils/serviceWorker";

const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/Signup"));
const App = lazy(() => import("./pages/App"));
const NotFound = lazy(() => import("./components/NotFound/"));
const renderLoader = () => <p></p>;

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={renderLoader()}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <AuthRoute path="/" exact component={App} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("app-mount")
);

serviceWorker.register();
