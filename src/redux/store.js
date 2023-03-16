// ----------------------------------------------------------------------
// Store redux
// ----------------------------------------------------------------------
// redux
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
// state slice
import dishStateSlice from './slices/dishStateSlice';
import calendarStateSlice from './slices/calendarStateSlice';
import dataApiStateSlice from './slices/dataApiStateSlice';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: {
    dishState: dishStateSlice,
    calendarState: calendarStateSlice,
    dataApiState: dataApiStateSlice,
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
