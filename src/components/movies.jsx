import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "All",
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
    });
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage, movies: allMovies, genres, selectedGenre } = this.state;

    const filtered =
      selectedGenre !== "All"
        ? allMovies.filter((movie) => movie.genre.name === selectedGenre)
        : allMovies;

    const count = filtered.length;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
            items={genres}
          />
        </div>
        <div className="col-6">
          {count === 0 ? (
            <p>There are no movies in database</p>
          ) : (
            <p>There are {count} movies in database</p>
          )}
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            movieCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
