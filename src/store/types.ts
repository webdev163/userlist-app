/* eslint  @typescript-eslint/no-explicit-any: 0 */

import { ActionCreatorsMapObject, AsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '~/store';

export type AsyncThunkConfig<T> = {
  state: RootState;
  rejectValue: T;
};

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, AsyncThunkConfig<any>>> = (
  ...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>;

export type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, AsyncThunkConfig<any>>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};
