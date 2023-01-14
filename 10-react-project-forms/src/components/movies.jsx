import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMoviesService";
import { pagiante } from "../utils/paginate";
import ListGroup from "./common/list-group";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    console.log("component did mount");
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    console.log("handle delete");
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies }, () => {
      this.setCurentPage();
    });
  };

  setCurentPage = () => {
    let currentPage = this.state.currentPage;
    const { pages } = this.getPages();
    if (this.state.currentPage > pages.length) {
      currentPage = pages.length;
    }
    this.setState({ currentPage: currentPage });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    console.log("handle page change");
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenere: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPages = () => {
    const { pageSize } = this.state;
    const { totalCount } = this.getPageData();

    const pagesCount = Math.ceil(totalCount / pageSize);

    const pages = _.range(1, pagesCount + 1);

    console.log("inside getPages function() " + pages);
    console.log("pages count " + pagesCount);
    return { pages, pagesCount };
  };

  getPageData = () => {
    console.log("inside get page data function()");
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenere,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenere && selectedGenere._id
        ? allMovies.filter((m) => m.genre._id === selectedGenere._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = pagiante(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    console.log("render");
    const { length: count } = this.state.movies;
    const { currentPage, genres, selectedGenere, sortColumn } = this.state;

    console.log("render method getpages function()");

    const { totalCount, data: movies } = this.getPageData();
    console.log("render method getpagedata function()");

    console.log("using this.state.curentpage() " + this.state.currentPage);

    if (count === 0) return <p>There are no movies in database</p>;

    console.log("render curentpage " + currentPage);

    return (
      <div className="container mt-3">
        <div className="row mt-3 pt-3">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenere}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p>Showing {totalCount} movies in the database.</p>

            <MoviesTable
              currentPage={currentPage}
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />

            <Pagination
              currentPage={currentPage}
              // pagesCount={pagesCount}
              getPages={this.getPages}
              // totalCount={totalCount}
              // pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
