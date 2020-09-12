import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import { toast } from 'react-toastify';

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  async populateGenres() {
    const genres = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    try {
      const movie = await getMovie(movieId);
      this.setState({ data: this.mapMovie(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404){
        this.props.history.replace("/not-found");
        toast.error("Movie not found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
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
    title: Joi.string().min(5).required().label("Title"),
    genreId: Joi.string().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

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
