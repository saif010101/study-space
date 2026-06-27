import {configureStore} from '@reduxjs/toolkit';
import spaceReducer from './slices/spaceSlice';
import dialogReducer from './slices/dialogSlice';

export const store = configureStore({
  reducer: {
    spaceReducer,
    dialogReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;