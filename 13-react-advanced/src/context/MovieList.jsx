import React, { Component } from "react";
import MovieRow from "./MovieRow";
import UserContext from "./userContext";

class MovieList extends Component {
  componentDidMount() {
    console.log("context", this.context);
  }
  render() {
    return (
      <UserContext.Consumer>
        {(userContext) => (
          <div>
            Movie List{" "}
            {userContext.currentUser ? userContext.currentUser.name : ""}
            <MovieRow />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

MovieList.contextType = UserContext;

export default MovieList;
