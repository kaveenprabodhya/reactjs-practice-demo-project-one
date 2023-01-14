import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
// import TableBody from "./common/table-body";
// import TableHeader from "./common/table-header";

class MoviesTable extends Component {
  columns = [
    { path: "title", lable: "Title" },
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
    {
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
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      //  <table className="table">
      //   <TableHeader
      //     sortColumn={sortColumn}
      //     columns={this.columns}
      //     onSort={onSort}
      //   />
      //   <TableBody data={movies} columns={this.columns} />
      // </table>

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
