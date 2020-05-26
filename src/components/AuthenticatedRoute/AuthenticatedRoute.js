import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// props will include a `user` object or null
// props will include a `component` if the `AuthenticatedRoute` did not use `render`
// We will call the component passed to the `component` prop `Component`
// If `render` was used instead, we will give it callback
// all other props that may be passed in are `...rest`
const AuthenticatedRoute = ({
  user,
  component: Component,
  render,
  ...rest
}) => {
  // if props include a `user` object and a `render` then create route with `render`
  // If we have any other props to send our `Route` we will pass those as `...rest`
  // This is a catch-all for any extra props we pass to `AuthenticatedRoute`
  if (user && render) {
    return <Route {...rest} render={render} />

  // if props include a `user` object but no `render` then create route with `Component`
  // if props do not include a `user` object then redirect to home
  } else {
    return <Route {...rest} render={props =>
      user ? <Component {...props} /> : <Redirect to='/' />
    } />
  }
}

export default AuthenticatedRoute
