import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
// import TableBody from "./common/table-body";
// import TableHeader from "./common/table-header";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      lable: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLikeToggle={() => this.props.onLike(movie)}
        />
      ),
    },
  ];

  delteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        type="submit"
        onClick={() => {
          this.props.onDelete(movie);
        }}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.delteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
