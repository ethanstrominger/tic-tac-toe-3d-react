import apiUrl from '../apiConfig'
import axios from 'axios'

const createMessage = (props, message) => {
  message.fromNickname = props.user
  return axios({
//    url: `${apiUrl}/messages/send/user/${message.toNickname}`,
    url: `${apiUrl}/messages/create/${message.toNickname}`,
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

const getMessageNotifications = (props) => {
  return axios({
    url: `${apiUrl}/messages/listen/${props.user}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${props.user.token}`
    }
  })
}

export {
  createMessage,
  getMessages,
  getMessageNotifications
}
