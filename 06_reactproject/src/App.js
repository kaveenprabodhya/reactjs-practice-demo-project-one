import "./App.css";
import Counters from "./components/counters";
import NavBar from "./components/navbar";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Counters />
      </main>
    </React.Fragment>
  );
}

export default App;
