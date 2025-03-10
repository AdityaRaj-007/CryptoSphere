import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import cryptoReducer from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { exchangesApi } from "../services/cryptoExchangesApi";

export default configureStore({
  reducer: {
    crypto: cryptoReducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [exchangesApi.reducerPath]: exchangesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      thunk,
      cryptoNewsApi.middleware,
      exchangesApi.middleware
    ),
});
