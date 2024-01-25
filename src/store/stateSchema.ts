import { LoginState } from './slices/loginSlice';
import { UserState } from './slices/userSlice';
import { Action, EnhancedStore, Reducer, ReducersMapObject, StateFromReducersMapObject } from '@reduxjs/toolkit';

export interface StateSchema {
  login: LoginState;
  user: UserState;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateFromReducersMapObject<ReducersMapObject<StateSchema>>, action: Action) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
