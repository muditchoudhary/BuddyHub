import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Defines a type alias `AppStore` that represents the type of the `store` object.
// This is useful for referencing the store's type elsewhere in the application.
export type AppStore = typeof store;

// Defines a type alias `RootState` that represents the state shape of the entire Redux store.
// It uses TypeScript's ReturnType utility type to infer the state shape from the store's `getState` method.
export type RootState = ReturnType<AppStore['getState']>;

// Defines a type alias `AppDispatch` for the store's `dispatch` method type.
// This is useful for typing the dispatch function in components and elsewhere, allowing for proper dispatching of actions.
export type AppDispatch = AppStore['dispatch'];

export default store;
