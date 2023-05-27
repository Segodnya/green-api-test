import './App.css';
import React, { useState, useEffect, lazy } from 'react';
import Login from '../Login/Login';
import { authorize, getUserInfo, getAllUsers, getChatHistory, sendNewMessage } from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SideBar = lazy(() => import('../Sidebar/Sidebar'));
const Chat = lazy(() => import('../Chat/Chat'));

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [usersList, setUsersList] = useState([]);

  const [roomContact, setRoomContact] = useState({});
  const [roomMessages, setRoomMessages] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const IdInstance = localStorage.getItem('IdInstance');
    const ApiTokenInstance = localStorage.getItem('ApiTokenInstance');
    if (IdInstance && ApiTokenInstance) {
      authorize(IdInstance, ApiTokenInstance)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.log(`Ошибка аутентификации -${err}`);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([getUserInfo(currentUser.wid), getAllUsers()])
        .then(([userData, allUsersData]) => {
          setUserInfo(userData);
          setUsersList(allUsersData);
        })
        .catch((err) => {
          console.log(`ошибка получения данных по API при первичном запросе данных и контактах и юзере: ${err}`);
        });
    }
  }, [loggedIn, currentUser.wid]);

  function onLogin(IdInstance, ApiTokenInstance) {
    authorize(IdInstance, ApiTokenInstance)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          localStorage.setItem('IdInstance', IdInstance);
          localStorage.setItem('ApiTokenInstance', ApiTokenInstance);
        }
      })
      .catch((err) => {
        console.log(`Ошибка аутентификации -${err}`);
      });
  }

  function getRoomContact(id) {
    getUserInfo(id)
      .then((user) => {
        setRoomContact(user);
      })
      .catch((err) => console.log(`Ошибка API при получении данных о RoomUser: ${err}`));

    getChatHistory(id)
      .then((messagesData) => {
        setRoomMessages(messagesData);
      })
      .catch((err) => console.log(`Ошибка API при получении messages with RoomUser: ${err}`));
  }

  async function sendMessage(id, message) {
    try {
      const resp = await sendNewMessage(id, message);
      return resp;
    } catch (err) {
      return console.log(`Ошибка API при отправке сообщения: ${err}`);
    }
  }

  return (
    <CurrentUserContext.Provider value={userInfo}>
      <div className="App">
        {!loggedIn ? (
          <Login onLogin={onLogin} />
        ) : (
          <div className="app_body">
            <SideBar usersList={usersList} onChoice={getRoomContact} />
            <Chat roomContact={roomContact} roomMessages={roomMessages} sendMessage={sendMessage} />
          </div>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
