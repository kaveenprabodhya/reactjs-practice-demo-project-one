import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().label("Title"),
    genreId: Joi.string().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Daily Rental Rate"),
  });

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie.id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form </h1>
        <div className="row">
          <div className="d-flex justify-content-center">
            <form className="col-8 mt-3" onSubmit={this.handleSubmitForm}>
              {this.renderInput("title", "Title", "text")}
              {this.renderSelect("genreId", "Genre", this.state.genres)}
              {this.renderInput("numberInStock", "Number In Stock", "text")}
              {this.renderInput("dailyRentalRate", "Daily Rental Rate", "text")}
              <div className="m-2">{this.renderButton("Save")}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieForm;
