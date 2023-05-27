import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://green-api.com/api/v1/auth', {
        idInstance,
        apiTokenInstance,
      });
      console.log(response.data);
      // Save the auth token to localStorage
      localStorage.setItem('greenApiAuthToken', response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID Instance:
        <input type="text" value={idInstance} onChange={(event) => setIdInstance(event.target.value)} />
      </label>
      <label>
        API Token Instance:
        <input type="text" value={apiTokenInstance} onChange={(event) => setApiTokenInstance(event.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
