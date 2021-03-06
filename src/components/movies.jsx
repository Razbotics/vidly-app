import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import Input from "./common/input";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
    searchValue: "",
  };

  async componentDidMount() {
    if (!this.props.location.state) {
      toast.success("Welcome to Vidly");
      this.props.location.state = null;
    }
    const genres = [{ _id: "", name: "All Genres" }, ...(await getGenres())];
    const movies = await getMovies();
    this.setState({ movies, genres });
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchValue: "" });
  };

  handleDelete = async (movie) => {
    const originalMovies = [...this.state.movies];
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
      toast.warn("Movie has been deleted");
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("Movie has been already deleted");
      this.setState({ movies: originalMovies });
    }
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({
      searchValue: input.value,
      selectedGenre: "All Genres",
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchValue,
    } = this.state;

    let filtered;
    if (searchValue) {
      filtered = allMovies.filter((movie) => {
        const title = movie.title;
        return title.toLowerCase().startsWith(searchValue.toLowerCase());
      });
    } else {
      filtered =
        selectedGenre !== "All Genres"
          ? allMovies.filter((movie) => movie.genre.name === selectedGenre)
          : allMovies;
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const count = sorted.length;
    const movies = paginate(sorted, currentPage, pageSize);
    return { count, movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchValue,
    } = this.state;

    const { count, movies } = this.getPagedData();

    return (
      <div className="container ml-1">
        <div className="row mb-2 tableWidth">
          {count === 0 ? (
            <h5>There are no movies in database</h5>
          ) : (
            <h5>There are {count} movies in database</h5>
          )}
        </div>

        <div className="row mb-5 tableWidth">
          <div className="mb-1 mr-2">
            <Link to="/movies/new">
              <button className="btn btn-primary">Add Movie</button>
            </Link>
          </div>
          <div className="mr-2">
            <ListGroup
              title="Genre"
              onItemSelect={this.handleGenreSelect}
              selectedItem={selectedGenre}
              items={genres}
            />
          </div>
        </div>

        <div className="row tableWidth">
          <Input
            autoFocus={false}
            placeholder={"Search..."}
            name={"search"}
            value={searchValue}
            type={"text"}
            label={null}
            onChange={this.handleChange}
            errors={null}
          />
        </div>

        <div className="row tableWidth">
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
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
