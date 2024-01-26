import { configureStore, ThunkAction, Action, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './stateSchema';
import loginReducer from './slices/loginSlice';
import userReducer from './slices/userSlice';
import { createReducerManager } from './reducerManager';

export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    login: loginReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: process.env.NODE_ENV === 'development',
    preloadedState: initialState,
  });

  return Object.assign(store, { reducerManager });
}

export type Store = ReturnType<typeof createReduxStore>;
export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
