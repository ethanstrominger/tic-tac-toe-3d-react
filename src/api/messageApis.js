import apiUrl from '../apiConfig'
import axios from 'axios'

const createMessage = (props, message) => {
  console.log("ABC");
  return axios({
    url: `${apiUrl}/messages/create`,
    method: 'POST'
    ,
    data: message
//    ,
//    headers: {
//      Authorization: `Bearer ${props.user.token}`
//    }
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
