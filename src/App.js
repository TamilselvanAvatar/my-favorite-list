import './style.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './components/store';
import { ListProvider } from './components/context/listContext';
import { NavigationProvider } from './components/context/navigationContext';
import { UserProvider } from './components/context/userContext';

import Root from './Root';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationProvider>
        <ListProvider>
          <UserProvider>
            <Root />
          </UserProvider>
        </ListProvider>
      </NavigationProvider>
    </Provider>
  );
}
