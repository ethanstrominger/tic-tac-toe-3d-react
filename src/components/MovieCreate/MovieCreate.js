import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { createMovie } from '../../api/movieApis'
import MovieForm from '../MovieForm/MovieForm'
import MainLayout from '../MainLayout/MainLayout'
import { getId } from '../../utils'

const MovieCreate = props => {
  const [movie, setMovie] = useState({ title: '', director: '', year: '' })
  const [createdMovieId, setCreatedMovieId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedMovie = Object.assign({ ...movie }, updatedField)
    setMovie(editedMovie)

    // console.log({ ...movie, [event.target.name]: event.target.value })

    // setMovie({ ...movie, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    createMovie(props, movie)
      .then(res => setCreatedMovieId(getId(res.data.movie)))
      .catch(console.error)
  }

  if (createdMovieId) {
    return <Redirect to={`/movies/${createdMovieId}`} />
  }

  return (
    <MainLayout>
      <MovieForm
        movie={movie}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </MainLayout>
  )
}

export default MovieCreate
