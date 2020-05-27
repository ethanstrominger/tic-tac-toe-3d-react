import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { createMessage } from '../../../api/messageApis'
import MessageForm from '../MessageForm/MessageForm'
import MainLayout from '../../MainLayout/MainLayout'
import { displayUnexpectedFailure} from '../../../utils'

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
         console.log("Message created")
         console.log(response)
         setCreatedMessageId(response.data.id)
        })
      .catch(error => {
        console.log(error);
        displayUnexpectedFailure(msgAlert, error, 'saving')
      })
  }

  if (createdMessageId) {
    console.log('c', createdMessageId)
    console.log(message)
    return <Redirect to={`/messages/getbyuser/${createdMessageId}`} />
  }

  return (
    <MainLayout>
      <MessageForm
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </MainLayout>
  )
}

export default MessageCreate
