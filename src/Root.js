import React, { useContext } from 'react';
import Root from './Main';
import Login from './Login';
import Route from './components/navigation/route';
import userContext from './components/context/userContext';
export default function Root() {
  const { login } = useContext(userContext);
  return (
    <>
      <Route path="/">
        <Login />
      </Route>
      {login && (
        <Route path="/list">
          <Root />
        </Route>
      )}
    </>
  );
}
