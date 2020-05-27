import React, { useState, useEffect } from 'react'
import MainLayout from '../../MainLayout/MainLayout'
import { getMessages } from '../../../api/messageApis'
import { displayUnexpectedFailure } from '../../../utils'

function formatDate(dateMilliseconds) {
    var myDate = new Date(dateMilliseconds);

    var month=[]
    month[0]="Jan"
    month[1]="Feb"
    month[2]="Mar"
    month[3]="Apr"
    month[4]="May"
    month[5]="Jun"
    month[6]="Jul"
    month[7]="Aug"
    month[8]="Sep"
    month[9]="Oct"
    month[10]="Nov"
    month[11]="Dec"
    var hours = myDate.getHours()
    var minutes = myDate.getMinutes()
    var seconds = myDate.getSeconds()
    var ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0'+minutes : minutes
    seconds = seconds < 10 ? '0'+seconds : seconds
    var strTime = `${hours}:${minutes}:${seconds} ${ampm}`
    var strDate = `${myDate.getDate()} ${month[myDate.getMonth()]} ${myDate.getFullYear()}`
    // e.g. "13 Nov 2016 11:00pm"
    return strDate + " "+strTime

}
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
    displayMessages = messages.map(message => {
      const dateText = formatDate(message.timeCreated)
      const fromText = message.fromNickname === props.user ? "":`From: ${message.fromNickname} ${dateText}`
      const toText = message.toNickname === props.user ? "":`To: ${message.toNickname} ${dateText}`
      // const fromText = message.fromNickname == props.user ? "":`From: ${message.fromNickname`
      return <div key={`message${message.id}`}>
        <p className="small"><strong>{fromText}</strong></p>
        <p className="small"><strong>{toText}</strong></p>
        <p className="small">{`${message.messageText}`}</p>
        <p className="small">.</p>
      </div>
    })
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
