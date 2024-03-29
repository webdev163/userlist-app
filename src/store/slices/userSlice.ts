import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '../stateSchema';
import { User } from '~/types/models';
import { AsyncThunkConfig } from '~/store/types';
import { BASE_URL, LocalStorageKeys } from '~/utils/constants';
import { ApiResponse } from '~/types/api';
import { nanoid } from 'nanoid';
import { localStorageHelper } from '~/utils/localStorageHelper';

export interface UserState {
  users: User[];
  isLoading: boolean;
  isFetched: boolean;
  error: string;
  page: number;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  isFetched: false,
  error: '',
  page: 1,
};

export const fetchUsers = createAsyncThunk<User[], { seed: string; page: number }, AsyncThunkConfig<string>>(
  'user/fetchUsers',
  async ({ seed, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}&seed=${seed}&page=${page}`);
      const data: ApiResponse = await response.json();
      return data.results;
    } catch (e) {
      return rejectWithValue((e as Error).message);
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

    restoreUsers: (state, action: PayloadAction<User[]>) => {
      state.users.unshift(...action.payload);
    },

    emptyUsers: state => {
      state.users = [];
    },

    addCustomUser: (state, action: PayloadAction<User>) => {
      const user = { ...action.payload, id: nanoid() };
      state.users.unshift(user);
      if (localStorageHelper.load(LocalStorageKeys.USERS)) {
        localStorageHelper.add(LocalStorageKeys.USERS, [user, ...localStorageHelper.load(LocalStorageKeys.USERS)]);
      } else {
        localStorageHelper.add(LocalStorageKeys.USERS, new Array(user));
      }
    },

    editCustomUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(el => el.id === action.payload.id);
      if (index >= 0) state.users[index] = action.payload;
      localStorageHelper.add(LocalStorageKeys.USERS, [
        ...localStorageHelper.load(LocalStorageKeys.USERS).map((el: User) => {
          return el.id === action.payload.id ? action.payload : el;
        }),
      ]);
    },

    removeCustomUser: (state, action: PayloadAction<string>) => {
      const index = state.users.findIndex(el => el.id === action.payload);
      if (index >= 0) state.users = state.users.filter(el => el.id !== action.payload);
      localStorageHelper.add(LocalStorageKeys.USERS, [
        ...localStorageHelper.load(LocalStorageKeys.USERS).filter((el: User) => {
          return el.id !== action.payload;
        }),
      ]);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
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
export const selectUsersIsFetched = (state: StateSchema) => state.user?.isFetched;
export const selectUsersError = (state: StateSchema) => state.user?.error;

export const userActions = { ...userSlice.actions, fetchUsers };

export default userSlice.reducer;
