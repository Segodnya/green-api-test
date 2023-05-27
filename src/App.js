import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for auth token in localStorage
    const authToken = localStorage.getItem('greenApiAuthToken');
    // Set the Authorization header for all axios requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Chat /> : <Login />}
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
