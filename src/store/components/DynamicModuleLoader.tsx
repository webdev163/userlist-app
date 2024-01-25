import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '../stateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
  children: ReactNode;
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
  children,
  reducers,
  removeAfterUnmount = true,
}) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const reducerMap = store.reducerManager.getReducerMap();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = reducerMap[name as StateSchemaKey];
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          const mounted = reducerMap[name as StateSchemaKey];
          if (mounted!) {
            store.reducerManager.remove(name as StateSchemaKey);
            dispatch({ type: `@DESTROY ${name} reducer` });
          }
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
