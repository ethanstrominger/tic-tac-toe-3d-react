import React from 'react'

const MovieForm = ({ movie, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="A Wonderful Film"
      name="title"
      value={movie.title || ''}
      onChange={handleChange}
      required
    />
    <label>Director</label>
    <input
      placeholder="A Director"
      name="director"
      value={movie.director || ''}
      onChange={handleChange}
      required
    />
    <label>Year Released</label>
    <input
      placeholder="YYYY-MM-DD"
      name="year"
      value={movie.year || ''}
      type="date"
      onChange={handleChange}
      required
    />
    <button type="submit">Submit</button>
  </form>
)

export default MovieForm
