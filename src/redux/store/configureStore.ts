import { configureStore } from '@reduxjs/toolkit';

import createReducer from './reducers';
import { articleApi } from '@/redux/api/articleApi.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '@/redux/api/authApi.ts';

function configureAppStore() {
  const store = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(articleApi.middleware, authApi.middleware),
    devTools: true
  });

  return { store };
}

export const { store } = configureAppStore();
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
