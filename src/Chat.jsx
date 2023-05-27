import React, { useState } from 'react';
import axios from 'axios';
import { REACT_APP_GREEN_API_ID_INSTANCE } from './utils';

function Chat() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [chatDialogs, setChatDialogs] = useState([]);

  const handleCreateChat = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://green-api.com/api/v1/${REACT_APP_GREEN_API_ID_INSTANCE}/chats`, {
        phone: phoneNumber,
      });
      console.log(response.data);
      setChatDialogs((prevDialogs) => [...prevDialogs, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateChat}>
        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
        </label>
        <button type="submit">Create Chat</button>
      </form>
      <ul>
        {chatDialogs.map((dialog) => (
          <li key={dialog.id}>{dialog.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
