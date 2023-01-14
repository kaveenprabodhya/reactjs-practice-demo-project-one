import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import NotFound from "./components/not-found";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieform";
import LoginForm from "./components/common/loginForm";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <NavBar />
        <Switch>
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

export default App;
