import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '../stateSchema';
import axios, { AxiosError } from 'axios';
import { User } from '~/types/models';
import { AsyncThunkConfig } from '~/store/types';
import { BASE_URL } from '~/utils/constants';
import { ApiResponse } from '~/types/api';
import { nanoid } from 'nanoid';

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
  page: number;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
  page: 1,
};

export const fetchUsers = createAsyncThunk<User[], { seed: string; page: number }, AsyncThunkConfig<string>>(
  'user/fetchUsers',
  async ({ seed, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get<ApiResponse>(`${BASE_URL}&seed=${seed}&page=${page}`);
      return response.data.results;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increasePage: state => {
      state.page += 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        const payload = action.payload;
        payload.forEach(el => {
          el.id = nanoid();
          el.isCustom = false;
        });
        state.users.push(...payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectUsers = (state: StateSchema) => state.user?.users;
export const selectPage = (state: StateSchema) => state.user?.page;
export const selectUsersIsLoading = (state: StateSchema) => state.user?.isLoading;
export const selectUsersError = (state: StateSchema) => state.user?.error;

export const userActions = { ...userSlice.actions, fetchUsers };

export default userSlice.reducer;
