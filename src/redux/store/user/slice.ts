import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isAuthorized: boolean | null;
}

const INITIAL_STATE: UserState = {
  isAuthorized: false
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setAuthorized: (state, action: PayloadAction<{ isAuthorized: boolean }>) => {
      state.isAuthorized = action.payload.isAuthorized;
    }
  }
});

export default userSlice.reducer;
export const { setAuthorized } = userSlice.actions;
