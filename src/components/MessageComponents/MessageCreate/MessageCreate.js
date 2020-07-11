import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { createMessage } from '../../../api/messageApis'
import MessageForm from '../MessageForm/MessageForm'
import MainLayout from '../../MainLayout/MainLayout'
import { displayUnexpectedFailure} from '../../../utils'
import GameSocketConnection from '../../../GameSocketConnection'

const MessageCreate = props => {
  const { msgAlert } = props
  const [message, setMessage] = useState({
    fromNickname: '',
    toNickname: '',
    messageText: ''
  })
  const [createdMessageId, setCreatedMessageId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedMessage = Object.assign({ ...message }, updatedField)
    setMessage(editedMessage)
  }

  const handleSubmit = event => {
    event.preventDefault()
    createMessage(props, message)
      .then(response => {
         setCreatedMessageId(response.data.id)
        })
        .then( response => 
          { GameSocketConnection.sendMessage(message);
          })      
      .catch(error => {
        console.log(error)
        displayUnexpectedFailure(msgAlert, error, 'saving')
      })
  }

  if (createdMessageId) {
    return <Redirect to={`/messages/getbyuser/${createdMessageId}`} />
  }
  return (
    <MainLayout>
      <MessageForm
        currentUser={props.user}
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </MainLayout>
  )
}

export default MessageCreate
