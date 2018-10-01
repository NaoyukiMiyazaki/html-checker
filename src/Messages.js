import React from 'react'

import './Messages.css'

const Message = ({ message }) => (
  <li className={message.type}>{message.type}: <a href={`#L${message.line}`}>line:{message.line}</a> {message.message}</li>
)

const Messages = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, i) => (
        <Message key={`${message.evidence}-${i}`} message={message} />
      ))}
    </ul>
  )
}

export default Messages
