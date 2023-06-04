import { configureStore } from '@reduxjs/toolkit';

import authReducer from './app/auth';
import tutorialReducer from './app/tutorials';

const reducer = {
  auth: authReducer,
  tutorials: tutorialReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
