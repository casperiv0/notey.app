import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import AuthRoute from "./components/AuthRoute";
import store from "./utils/store";
import Loader from "./components/Loader";

const Landing = lazy(() => import("./pages/Landing"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/Signup"));
const Logout = lazy(() => import("./pages/auth/Logout"));
const App = lazy(() => import("./pages/App"));
const SharePage = lazy(() => import("./pages/SharePage"));
const NotFound = lazy(() => import("./components/NotFound/"));
const renderLoader = () => <Loader center={true} color="#f2f2f2" />;

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={renderLoader()}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/logout" exact component={Logout} />
            <AuthRoute path="/app" exact component={App} />
            <Route path="/share/:noteId" exact component={SharePage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("app-mount")
);
