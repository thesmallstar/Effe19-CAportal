import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import RTL from "layouts/RTL.jsx";
import Landing from "./views/Pages/landing";
import AdminPage from "./views/Pages/EffeAdmin";
import "assets/css/material-dashboard-react.css?v=1.6.0";
// import LoginPage from "./views/Pages/LoginPage";
// import RegisterPage from "./views/Pages/RegisterPage";
import { LastLocationProvider } from 'react-router-last-location';
// import LogoutPage from "./views/Pages/Logout";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router  history={hist}>
    <Switch>
    <LastLocationProvider>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/effe2019admin18003726' component={AdminPage}/>
      {/* <Route path="/logout" component={LogoutPage} /> */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/rtl" component={RTL} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
      </LastLocationProvider>
    </Switch>
  </Router>,
  document.getElementById("root")
);
