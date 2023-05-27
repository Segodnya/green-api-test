import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_GREEN_API_BASE_URL, REACT_APP_GREEN_API_ID_INSTANCE, REACT_APP_GREEN_API_TOKEN } from './utils';

const ChatDialog = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${REACT_APP_GREEN_API_BASE_URL}/chat/${chat.chatId}/messages`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${REACT_APP_GREEN_API_TOKEN}`,
        },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chat.chatId]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleNewMessageSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${REACT_APP_GREEN_API_BASE_URL}/chat/${chat.chatId}/message`,
        {
          message: newMessage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${REACT_APP_GREEN_API_TOKEN}`,
            idInstance: `${REACT_APP_GREEN_API_ID_INSTANCE}`,
          },
        }
      )
      .then((response) => {
        setMessages([...messages, response.data]);
        setNewMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="chat-dialog">
      <div className="chat-dialog-header">
        <button onClick={onBack}>Back</button>
        <h2>{chat.name}</h2>
      </div>
      <div className="chat-dialog-messages">
        {messages.map((message) => (
          <div className="chat-dialog-message" key={message.id}>
            <div className="chat-dialog-message-text">{message.text}</div>
            <div className="chat-dialog-message-sender">{message.sender}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleNewMessageSubmit}>
        <input type="text" value={newMessage} onChange={handleNewMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatDialog;
