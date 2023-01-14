import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import NotFound from "./components/not-found";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieform";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/common/register";
import LogOut from "./components/logout";
import jwidecode from "jwt-decode";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwidecode(jwt);
      // console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <NavBar user={this.state.user} />
          <Switch>
            <Route path="/logout" component={LogOut}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
