import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { UserState } from './slice';

export const selectDomain = (state: RootState) => {
  return state.user;
};

export const SelectIsAuthorized = createSelector([selectDomain], (userState: UserState) => userState.isAuthorized);
