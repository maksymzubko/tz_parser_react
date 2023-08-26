import { combineReducers } from 'redux';
import userSlice from './user/slice';
import { articleApi } from '@/redux/api/articleApi.ts';
import { authApi } from '@/redux/api/authApi.ts';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    user: userSlice,
    articleApi: articleApi.reducer,
    authApi: authApi.reducer,
    ...injectedReducers
  });

  return rootReducer;
}
