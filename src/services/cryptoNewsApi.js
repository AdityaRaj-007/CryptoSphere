import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsParams = {
  apiKey: process.env.REACT_APP_NEWS_API_KEY,
};

console.log(process.env.REACT_APP_NEWS_API_KEY);

const baseUrl = "https://newsapi.org/v2/everything";

const createRequest = (url) => ({
  url,
  params: cryptoNewsParams,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(`?q=${newsCategory}&pageSize=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
