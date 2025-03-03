import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  accept: "application/json",
  "x-cg-demo-api-key": process.env.REACT_APP_EXCHANGE_API_KEY,
};

const baseUrl = "https://api.coingecko.com/api/v3";

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const exchangesApi = createApi({
  reducerPath: "exchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
    getExchangeData: builder.query({
      query: (name) => createRequest(`/exchanges/${name}`),
    }),
  }),
});

export const { useGetExchangesQuery, useGetExchangeDataQuery } = exchangesApi;
