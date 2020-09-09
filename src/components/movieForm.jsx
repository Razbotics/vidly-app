import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "new",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  componentDidMount() {
    const movieId = this.props.match.params.id;
    const genres = getGenres();
    this.setState({ genres });

    console.log(movieId);
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapMovie(movie) });
  }

  mapMovie = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(1).required().label("Title"),
    genreId: Joi.string().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
  };

  doSubmit = () => {
    const { history } = this.props;
    saveMovie(this.state.data);
    history.push("/movies");
  };

  /* {match.params.id} */
  render() {
    return (
      <div className="movieFormWidth">
        <h1>Movie Form</h1>
        {this.renderInput("title", "Title", {
          focus: true,
          placeholder: "Title of the movie",
        })}
        {this.renderSelect("genreId", "Genre", this.state.genres, {
          placeholder: "Select Genre of Movie",
        })}
        {this.renderInput("numberInStock", "Number In Stock", {
          placeholder: "Quantity in stock",
        })}
        {this.renderInput("dailyRentalRate", "Rate", {
          placeholder: "Rate of the Movie",
        })}
        {this.renderButton("Save")}
      </div>
    );
  }
}

export default MovieForm;
