import React from 'react';

function ChatMessage({ message, currentUser }) {
  const isSender = !!message.senderName;
  const messageType = message.typeMessage;

  const getTextMessage = () => {
    if (messageType === 'textMessage' || messageType === 'extendedTextMessage') {
      return message.textMessage;
    }
    return 'Отправлена фото';
  };

  return (
    <p key={message.idMessage} className={`chat_message ${isSender ? '' : 'chat_reciever'}`}>
      <span className="chat_name">{isSender ? message.senderName : currentUser?.name}</span>
      {getTextMessage()}
      <span className="chat_timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
    </p>
  );
}

export default ChatMessage;
