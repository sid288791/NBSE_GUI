import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";
  import Users from "./users";
import Contact from "./contact";
import Notfound from "./notfound";
import VerifyOTP from "./Login/VerifyOTP"
import MobileNumber from './Login/MobileNumber';
import Register from './Login/Register';
import Login from './Login/LoginPage';
import Payment from './Login/Payment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
  

const routing = (
  <div className="App">
    <Router> 
    <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/VerifyOTP" component={VerifyOTP} />
        <Route path="/resendOTP" component={MobileNumber} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/payment" component={Payment} />
        <Route component={Notfound} />
      </Switch>
  </Router>
  </div>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
