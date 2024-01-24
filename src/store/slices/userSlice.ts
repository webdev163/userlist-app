import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '../stateSchema';
import axios, { AxiosError } from 'axios';
import { User } from '~/types/models';
import { AsyncThunkConfig } from '~/store/types';

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
};

export const fetchUsers = createAsyncThunk<User[], void, AsyncThunkConfig<string>>(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectUsers = (state: StateSchema) => state.user?.users;
export const selectUsersIsLoading = (state: StateSchema) => state.user?.isLoading;
export const selectUsersError = (state: StateSchema) => state.user?.error;

export const userActions = { ...userSlice.actions, fetchUsers };

export default userSlice.reducer;
