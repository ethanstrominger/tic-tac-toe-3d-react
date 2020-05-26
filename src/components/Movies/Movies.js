import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../MainLayout/MainLayout'
import { getMovies } from '../../api/movieApis'
import { getId } from '../../utils'

const Movies = props => {
  // NOTE on React Hook: useState is used by React Hooks to create state variables and
  // setter function for component
  const [movies, setMovies] = useState([])

  // ==== Fetch movies into movies variable ===
  // NOTE on React Hook: useEffect: syntax by React Hooks. Code is called when component mounts,
  // or is updated
  useEffect(() => {
    getMovies(props) // returns promise to get movies
      .then(res => {
        setMovies(res.data.movies.filter(movie => getId(movie) !== undefined))
      })
      .catch(console.error)
  }, [])

  // === set movieLinks to html bulleted list of movies ussing movies variable
  const moviesLinks = movies.filter(movie => getId(movie) !== undefined).map(movie => (
    <li key={`movie${getId(movie)}`}>
      <Link to={`/movies/${getId(movie)}`}>{movie.title}</Link>
    </li>
  ))

  // === return fragment with a h4 and the list of movies.
  return (
    <MainLayout>
      <h4>Movies!</h4>
      <ul>
        {moviesLinks}
      </ul>
    </MainLayout>
  )
}
export default Movies
