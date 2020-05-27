import React, { useState, useEffect } from 'react'
import MainLayout from '../../MainLayout/MainLayout'
import { getMessages } from '../../../api/messageApis'
import { displayUnexpectedFailure } from '../../../utils'

const Messages = props => {
  // NOTE on React Hook: useState is used by React Hooks to create state variables and
  // setter function for component
  const { msgAlert } = props
  const [messages, setMessages] = useState([])

  // ==== Fetch messages into messages variable ===
  // NOTE on React Hook: useEffect: syntax by React Hooks. Code is called when component mounts,
  // or is updated
  useEffect(() => {
    getMessages(props) // returns promise to get messages
      .then(res => {
        setMessages(res.data)
      })
      .catch(error => {
        displayUnexpectedFailure(msgAlert, error, 'fetching')
      })
  }, [])

  // ==== Display messages ====
  let displayMessages
  if (messages.length === 0) {
    displayMessages = <p>No messages.  Click on create to add a new one.</p>
  } else {
    displayMessages = messages.map(message => (
      <div key={`message${messages.id} ${message.timeCreated}`}>
        <p class="small"><strong>{` ${message.fromNickname}`}</strong></p>
        <p class="small"><strong>{`To: ${message.toNickname}`}</strong></p>
        <p class="small">{`${message.messageText}`}</p>
        <p class="small">.</p>
      </div>
    ))
  }

  // === return fragment with a h4 and the list of messages.
  return (
    <MainLayout>
      <h4>Messages</h4>
      <ul>
        {displayMessages}
      </ul>
    </MainLayout>
  )
}
export default Messages
