import React, { createContext, useState, useContext, useEffect } from 'react';
import NavigationContext from './navigationContext';
import ListContext from './listContext';
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { navigate } = useContext(NavigationContext);
  const { addList } = useContext(ListContext);
  const [login, setLogin] = useState({});

  const loginHandler = (name) => {
    const lowerName = name.toLowerCase();
    setLogin({ name: lowerName });
    navigate('/list');
  };

  const logOutHandler = () => {
    addList([], null);
    setLogin(false);
    navigate('/');
  };

  const valueToshare = {
    login,
    loginHandler,
    logOutHandler,
  };

  return (
    <UserContext.Provider value={valueToshare}>{children}</UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
