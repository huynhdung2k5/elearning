// ----------------------------------------------------------------------
// Store redux
// ----------------------------------------------------------------------
// redux
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
// state slice
import dishStateSlice from './slices/dishStateSlice';
import calendarStateSlice from './slices/calendarStateSlice';
import kanbanStateSlice from './slices/kanbanStateSlice';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: {
    dishState: dishStateSlice,
    calendarState: calendarStateSlice,
    kanbanState: kanbanStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
}); // config store

const { dispatch } = store; // dispatch action

const useSelector = useAppSelector; // gọi state

const useDispatch = () => useAppDispatch(); // dispatch

export { store, dispatch, useSelector, useDispatch };
