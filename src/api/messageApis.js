import apiUrl from '../apiConfig'
import axios from 'axios'

const createMessage = (props, message) => {
  return axios({
    url: `${apiUrl}/messages/create`,
    method: 'POST',
    data: message
//    TODO: Authorization
//    ,
//    headers: {
//      Authorization: `Bearer ${props.user.token}`
//    }
  })
}

const getMessages = (props) => {
  return axios({
    url: `${apiUrl}/messages/getbyuser/${props.user}`,
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
