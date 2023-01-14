import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { pagiante } from "../utils/paginate";
import ListGroup from "./common/list-group";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchbox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenere: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    console.log("component did mount");

    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    console.log("handle delete");
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies }, () => {
      this.setCurentPage();
    });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
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
    this.setState({ selectedGenere: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenere: null, currentPage: 1 });
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
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenere && selectedGenere._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenere._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = pagiante(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    console.log("render");
    const { length: count } = this.state.movies;
    const { currentPage, genres, selectedGenere, sortColumn, searchQuery } =
      this.state;

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
            <Link className="btn btn-primary" type="submit" to="/movies/new">
              New Movie
            </Link>

            <p className="mt-2">Showing {totalCount} movies in the database.</p>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />

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
              getPages={this.getPages}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
