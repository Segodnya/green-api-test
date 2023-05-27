import './Sidebar.css';
import '../Chat/ChatHeader/ChatHeader.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SidebarChat from './SidebarChat/SidebarChat';
import SidebarSearch from './SidebarSearch/SidebarSearch';

const Sidebar = ({ usersList, onChoice }) => {
  const { avatar: currentUserAvatar } = React.useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="chat_header_icon-avatar-container">
          <img className="chat_header_icon-avatar" src={currentUserAvatar} alt="User avatar" />
        </div>

        <div className="sidebar_headerRight">
          <button className="sidebar_header_icon sidebar_header_icon-status" />
          <button className="sidebar_header_icon sidebar_header_icon-edit" />
          <button className="sidebar_header_icon sidebar_header_icon-dots" />
        </div>
      </div>

      <SidebarSearch usersList={usersList} onChoice={onChoice} />

      <div className="sidebar_chat">
        {usersList.map(({ id, name }) => (
          <SidebarChat key={id} name={name} id={id} onChoice={onChoice} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
