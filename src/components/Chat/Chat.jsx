import './Chat.css';
import React, { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatMessage from './ChatMessage/ChatMessage';
import ChatFooter from './ChatFooter/ChatFooter';

function Chat({ roomContact, roomMessages, sendMessage }) {
  const { values, handleChange, setValues } = useForm({ message: '' });
  const currentUser = React.useContext(CurrentUserContext);
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setRoomName(roomContact);
    setMessages(roomMessages);
  }, [roomContact, roomMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.message) {
      const response = sendMessage(roomName.chatId, values.message);
      const newMessage = {
        type: 'outgoing',
        idMessage: response.idMessage,
        timestamp: new Date().toString(),
        typeMessage: 'textMessage',
        chatId: '79175714340@c.us',
        textMessage: values.message,
        statusMessage: 'read',
        sendByApi: true,
      };
      setMessages((prev) => [newMessage, ...prev]);
      setValues({ message: '' });
    }
  };

  return (
    <div className="chat">
      <ChatHeader roomName={roomName} />
      <div className="chat_body">
        {messages.map((message) => (
          <ChatMessage key={message.idMessage} message={message} currentUser={currentUser} />
        ))}
      </div>
      <ChatFooter roomName={roomName} onSubmit={handleSubmit} values={values} onChange={handleChange} />
    </div>
  );
}

export default Chat;
