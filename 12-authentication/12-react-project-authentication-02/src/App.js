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
import "./App.css";
import { getCurrentUser } from "./services/authService";
import ProtectectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
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
            {/* <Route path="/movies/:id" component={MovieForm}></Route> */}
            {/* <Route
              path="/movies/:id"
              render={(props) => {
                if (!this.state.user) return <Redirect to="/login" />;
                return <MovieForm {...props} />;
              }}
            ></Route> */}
            <ProtectectedRoute path="/movies/:id" component={MovieForm} />
            {/* <Route path="/movies" component={Movies}></Route> */}
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
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
