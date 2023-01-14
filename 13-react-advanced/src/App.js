import React, { Component } from "react";
import "./App.css";
import CartContext from "./context/cartContext";
import Login from "./context/Login";
import MoviePage from "./context/MoviePage";
import UserContext from "./context/userContext";
// import Movie from "./hoc/Movie";
// import CounterF from "./hooks/CounterF";
// import Users from "./hooks/Users";

class App extends Component {
  state = { currentUser: /* { name: "Kaveen" } */ null };
  handleLoggedIn = (username) => {
    console.log("Getting user: ", username);
    const user = { name: "Kaveen" };
    this.setState({ currentUser: user });
  };
  render() {
    return (
      <CartContext.Provider value={{ cart: [] }}>
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onLoggedIn: this.handleLoggedIn,
          }}
        >
          <div>
            <MoviePage />
            <Login />
          </div>
        </UserContext.Provider>
      </CartContext.Provider>
    );
  }
}

export default App;
