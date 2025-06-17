import { configureStore } from '@reduxjs/toolkit';
import { flightsApi } from '@/api/flightsAPI';

export const store = configureStore({
  reducer: {
    [flightsApi.reducerPath]: flightsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flightsApi.middleware),
});