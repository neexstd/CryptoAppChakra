import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoapi";
import { cryptoNews } from "../services/newsApi";
export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNews.reducerPath]: cryptoNews.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNews.middleware),
});
