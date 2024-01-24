import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LoginState {
  seed: string | null;
}

const initialState: LoginState = {
  seed: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setSeed: (state, action: PayloadAction<string>) => {
      state.seed = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
