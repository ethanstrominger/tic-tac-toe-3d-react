import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// Import all custom components for our App
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Movies from '../Movies/Movies'
import Movie from '../Movie/Movie'
import MovieCreate from '../MovieCreate/MovieCreate'
import MovieEdit from '../MovieEdit/MovieEdit'
import EventSearches from '../EventComponents/EventSearches/EventSearches'
import EventSearch from '../EventComponents/EventSearch/EventSearch'
import EventSearchCreate from '../EventComponents/EventSearchCreate/EventSearchCreate'
import EventSearchEdit from '../EventComponents/EventSearchEdit/EventSearchEdit'
import messages from '../AutoDismissAlert/messages'
import { signIn } from '../../api/auth.js'

// We want to have state at the highest level possible in our app
// So `App` is a class component
class App extends Component {
  constructor () {
    super()

    // Setup state: hold a reference to the user and all message alerts
    this.state = {
      user: null,
      msgAlerts: []
    }

    if (process.env.REACT_APP_AUTO_LOGIN_EMAIL) {
      this.autoLogin()
    }
  }

  autoLogin = () => {
    const credentials = {
      email: process.env.REACT_APP_AUTO_LOGIN_EMAIL,
      password: process.env.REACT_APP_AUTO_LOGIN_PASSWORD
    }
    signIn(credentials)
      .then(res => this.setUser(res.data.user))
      .then(() => this.msgAlert({
        heading: 'Auto Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({
          email: '',
          password: ''
        })
        this.msgAlert({
          heading: 'Auto sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  // This method is passed as a prop to `SignIn` and `SignUp`
  // It is used to set the user on the state after successful sign in
  // Sign in happens automatically after as successful sign up
  // We declare this in `App` so it modifies the state of `App` not a child component
  setUser = user => this.setState({ user })

  // This method is passed as a prop to `SignOut` or any component that needs to clear the user
  // It sets the `user` to `null`
  clearUser = () => this.setState({ user: null })

  // This method is passed as a prop to almost every component (any component that wants to display messages)
  // Accepts a `heading`, `message`, and `variant`
  // It sets the state of the `msgAlerts` array to add in the new message it receives
  msgAlert = ({ heading, message, variant }) => {
    // The spread (...) operator allows us to create a copy of the current `msgAlerts` and add a new one to that array
    // This then sets the state with the updated array
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  // This renders our app!
  render () {
    // Destructure from the state
    const { msgAlerts, user } = this.state

    // We have to return JSX!
    // We pass the user to the `Header` to have it display the correct links
    // Map over the `msgAlerts` array and display one `AutoDismissAlert` for each object
    // For routing, we have `Route` and `AuthenticatedRoute`:
    // Routes can be used for regular routing!
    // AuthenticatedRoute can be used if we only want to allow access to a route after a user has signed in
    // We MUST pass `user` as a prop to the `AuthenticatedRoute`s we use
    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={props => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/movies' render={() => (
            <Movies msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/movies/:id' render={({ match }) => (
            <Movie match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/movie-create' render={() => (
            <MovieCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/movies/:id/edit' render={({ match }) => (
            <MovieEdit match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/event_searches' render={() => (
            <EventSearches msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/event_searches/:id' render={({ match }) => (
            <EventSearch match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/eventsearch-create' render={() => (
            <EventSearchCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/event_searches/:id/edit' render={({ match }) => (
            <EventSearchEdit match={match} msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
