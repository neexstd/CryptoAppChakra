import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coin } from "../types";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "a6d588a466mshc379e6d1a20f987p1278ebjsn93d975cdd231",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/coins?limit=100"),
    }),
    getCryptoDetail: builder.query({
      query: (coinId) => createRequest(`coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({coinId, timePeriod}) =>
        createRequest(
          `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}&uuids%5B0%5D=${coinId}&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0`
        ),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
