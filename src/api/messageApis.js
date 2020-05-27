import apiUrl from '../apiConfig'
import axios from 'axios'

const createMessage = (props, message) => {
  return axios({
    url: `${apiUrl}/messages/`,
    method: 'POST',
    data: {
      message: message
    },
    headers: {
      Authorization: `Bearer ${props.user.token}`
    }
  })
}

const getMessages = (props) => {
  return axios({
    url: `${apiUrl}/messages/`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${props.user.token}`
    }
  })
}


export {
  createMessage,
  getMessages
}
