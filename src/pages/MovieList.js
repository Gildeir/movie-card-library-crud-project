import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  async fetchMovies() {
    const result = await movieAPI.getMovies();
    this.setState({ movies: result, loading: false });
  }

  render() {
    const { movies } = this.state;
    const { loading } = this.state;
    // Render Loading here if the request is still happening
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="movie-list">
        {
          movies.map((movie) => (<MovieCard key={ movie.title } movie={ movie } />))
        }
      </div>
    );
  }
}

export default MovieList;

MovieList.propTypes = {
  getMovies: PropTypes.func,
}.isRequired;
