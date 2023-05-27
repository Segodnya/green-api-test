import './SidebarChat.css';
import '../../Chat/ChatHeader/ChatHeader.css';
import React, { useState, useEffect } from 'react';

const SidebarChat = ({ id, name, onChoice }) => {
  const [avatarSeed, setAvatarSeed] = useState('');

  useEffect(() => {
    setAvatarSeed(Math.floor(Math.random() * 5000));
  }, []);

  const handleChoiceUser = () => {
    onChoice(id);
  };

  return (
    <button className="sidebarChat" onClick={handleChoiceUser}>
      <div className="chat_header_icon-avatar-container">
        <img className="chat_header_icon-avatar" src={`https://avatars.dicebear.com/api/human/${avatarSeed}.svg`} alt="User avatar" />
      </div>
      <div className="sidebarChat_info">
        <h3>{name}</h3>
        <p>{id}</p>
      </div>
    </button>
  );
};

export default SidebarChat;
