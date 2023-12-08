import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bTrieSlice } from './features';

export const makeStore = () => {
  const reducer = combineReducers({
    bTrie: bTrieSlice.reducer
  });
  return configureStore({
    reducer
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
