import { createContext, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';

export const UserContext = createContext()

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Login></Login>
    </UserContext.Provider>
  );
}

export default App;
