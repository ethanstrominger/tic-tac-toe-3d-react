import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import MovieForm from '../MovieForm/MovieForm'
import MainLayout from '../MainLayout/MainLayout'
import { saveUpdatedMovie, getMovie } from '../../api/movieApis.js'

const MovieEdit = props => {
  const [movie, setMovie] = useState({ title: '', director: '', year: '' })
  const [isMovieUpdated, setIsMovieUpdated] = useState(false)

  useEffect(() => {
    getMovie(props)
      .then(res => setMovie(res.data.movie))
      .catch(console.error)
  }, [])
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedMovie = Object.assign({ ...movie }, updatedField)
    // React doesn't like mutating objects/storing its data without using this.setState
    // destructuring the movie, making a copy of the object to update it with the modified field
    setMovie(editedMovie)
  }
  const handleSubmit = event => {
    event.preventDefault()
    saveUpdatedMovie(props, movie)
      .then(() => setIsMovieUpdated(true))
      .catch(console.error)
  }
  if (isMovieUpdated) {
    return <Redirect to={`/movies/${props.match.params.id}`} />
  }
  return (
    <MainLayout>
      <MovieForm
        movie={movie}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/movies/${props.match.params.id}`}
      />
    </MainLayout>
  )
}

export default MovieEdit
