import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
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
    const loadingElement = <span> Carregando... </span>;

    return (
      <div data-testid="movie-list">
        {loading}
        {' '}
        ?
        { loadingElement }
        {' '}
        :
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
