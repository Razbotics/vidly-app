import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      inStock: "",
      rate: "",
    },
    errors: {},
    genres: [],
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
  }

  schema = {
    id: Joi.string(),
    title: Joi.string().min(1).required().label("Title"),
    genreId: Joi.string().label("Genre"),
    inStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number In Stock"),
    rate: Joi.number().min(1).max(10).required().label("Rate"),
  };

  doSubmit = () => {
    const { history } = this.props;
    console.log(this.state.data);
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
        {this.renderInput("inStock", "Number In Stock", {
          placeholder: "Quantity in stock",
        })}
        {this.renderInput("rate", "Rate", { placeholder: "Rate of the Movie" })}
        {this.renderButton("Save")}
      </div>
    );
  }
}

export default MovieForm;
