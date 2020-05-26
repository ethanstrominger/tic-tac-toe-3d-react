import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import MainLayout from '../MainLayout/MainLayout'
import { getMovie, destroyMovie } from '../../api/movieApis'

const Movie = props => {
  const [movie, setMovie] = useState(null)
  const [deleted, setDeleted] = useState(false)

  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    getMovie(props)
      // Make sure to update this.setState to our hooks setMovie function
      .then(res => setMovie(res.data.movie))
      .catch(console.error)
  }, [])

  const destroy = () => {
    destroyMovie(props)
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!movie) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Movie succesfully deleted!' } }
    } />
  }

  return (
    <MainLayout>
      <h4>{movie.title}</h4>
      <p>Date released: {movie.year}</p>
      <p>Directed by: {movie.director}</p>
      <button onClick={destroy}>Delete Movie</button>
      <Link to={`/movies/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/movies">Back to all movies</Link>
    </MainLayout>
  )
}

export default Movie
