import { createSlice } from '@reduxjs/toolkit';

export interface LoginState {
  isLoading: boolean;
}

const initialState: LoginState = {
  isLoading: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
