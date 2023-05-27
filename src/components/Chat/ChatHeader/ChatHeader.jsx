import React from 'react';
import './ChatHeader.css';

function ChatHeader({ roomName }) {
  return (
    <div className="chat_header">
      <div className="chat_header_icon-avatar-container">
        <img className="chat_header_icon-avatar" src={roomName?.avatar} alt="User Avatar" />
      </div>

      <div className="chat_headerInfo">
        <h3>{roomName?.name}</h3>
        <p>last seen at: </p>
      </div>

      <div className="chat_headerRight">
        <button className="chat_header_icon chat_header_icon-search" />
        <button className="chat_header_icon chat_header_icon-clip" />
        <button className="chat_header_icon chat_header_icon-dots" />
      </div>
    </div>
  );
}

export default ChatHeader;
