import {configureStore} from '@reduxjs/toolkit';
import spaceReducer from './slices/spaceSlice';
import dialogReducer from './slices/dialogSlice';
import roomReducer from './slices/roomSlice';

export const store = configureStore({
  reducer: {
    spaceReducer,
    dialogReducer,
    roomReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;