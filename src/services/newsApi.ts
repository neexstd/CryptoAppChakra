import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "a6d588a466mshc379e6d1a20f987p1278ebjsn93d975cdd231",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNews = createApi({
  reducerPath: "cryptoNews",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (newsCategory: string) =>
        createRequest(
          `/news/search?q=${newsCategory}&sageSearch=Off&textFormat=Raw&freshness=Day&count=100`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNews;
