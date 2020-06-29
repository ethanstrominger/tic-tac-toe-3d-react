import apiUrl from '../apiConfig'
import axios from 'axios'

function signUp (credentials) {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

function signIn (credentials) {
  return new Promise((resolve) => {
    resolve ( {
      url: apiUrl + '/sign-in',
      method: 'POST',
      data: {
        user: credentials.email,
        credentials: {
          email: credentials.email,
          password: credentials.password
        }
      }
    })
  })
}

function signOut (user) {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

function changePassword (passwords, user) {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}

export { signIn, signOut, signUp, changePassword}