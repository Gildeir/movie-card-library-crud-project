import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      loading: true,
    };
    this.fetchMovie = this.fetchMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
  }

  componentDidMount() {
    this.fetchMovie();
  }

  async fetchMovie() {
    const { match: { params: { id } } } = this.props;
    const result = await movieAPI.getMovie(id);
    this.setState({ movie: result, loading: false });
  }

  removeMovie() {
    const { match: { params: { id } } } = this.props;
    movieAPI.deleteMovie(id);
  }

  render() {
    const { movie: { title, storyline, imagePath, genre, rating, subtitle },
      loading } = this.state;
    const { location: { pathname } } = this.props;
    // Change the condition to check the state
    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Title: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>

        <Link to="/">VOLTAR</Link>
        <Link to={ `${pathname}/edit` }>EDITAR</Link>
        <Link to="/" onClick={ this.removeMovie }>DELETAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  getMovie: PropTypes.func,
}.isRequired;

export default MovieDetails;
