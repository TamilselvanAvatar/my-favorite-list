import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './apis/usersApi';
import { listApi } from './apis/listApi';
const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(listApi.middleware);
  },
});
setupListeners(store.dispatch);
export default store;
export * from './apis/usersApi';
export * from './apis/listApi';
