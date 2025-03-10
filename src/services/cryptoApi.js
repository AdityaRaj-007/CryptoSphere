//import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

const cryptoApiHeaders = {
  "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

// const createRequest = (url) => ({
//   url,
//   headers: cryptoApiHeaders,
// });

// export const cryptoApi = createApi({
//   reducerPath: "cryptoApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getCryptos: builder.query({
//       query: (count) => createRequest(`/coins?limit=${count}`),
//     }),
//     getCryptoDetails: builder.query({
//       query: (coinId) => createRequest(`/coin/${coinId}`),
//     }),
//     getCryptoHistory: builder.query({
//       query: ({ coinId, timePeriod }) =>
//         createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
//     }),
//   }),
// });

// export const {
//   useGetCryptosQuery,
//   useGetCryptoDetailsQuery,
//   useGetCryptoHistoryQuery,
// } = cryptoApi;

const initialState = {
  loading: false,
  error: null,
  crypto: {},
  cryptoDetails: {},
  cryptoHistory: {},
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchCryptoSuccess: (state, action) => {
      console.log("🔥 Before Update: ", JSON.parse(JSON.stringify(state)));
      console.log(
        "✅ Action Payload: ",
        JSON.parse(JSON.stringify(action.payload))
      );

      state.loading = false;
      state.crypto = action.payload?.data || {}; // <-- ISSUE: It should be `state.crypto = action.payload`

      console.log("🚀 After Update: ", JSON.parse(JSON.stringify(state)));
    },

    fetchCryptoDetailsSuccess: (state, action) => {
      state.loading = false;
      state.cryptoDetails = action.payload;
    },

    fetchCryptoHistorySuccess: (state, action) => {
      state.loading = false;
      state.cryptoHistory = action.payload;
    },

    fetchFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFailed,
  fetchStart,
  fetchCryptoSuccess,
  fetchCryptoDetailsSuccess,
  fetchCryptoHistorySuccess,
} = cryptoSlice.actions;

export const fetchCrypto = (count) => async (dispatch) => {
  dispatch(fetchStart());

  try {
    const response = await fetch(`${baseUrl}/coins?limit=${count}`, {
      headers: cryptoApiHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("📢 API Response:", data);
    dispatch(fetchCryptoSuccess(data));
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};

export const fetchCryptoDetails = (id) => async (dispatch) => {
  dispatch(fetchStart());

  try {
    const response = await fetch(`${baseUrl}/coin/${id}`, {
      headers: cryptoApiHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    dispatch(fetchCryptoDetailsSuccess(data));
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};

export const fetchCryptoHistory = (id, timePeriod) => async (dispatch) => {
  dispatch(fetchStart());

  try {
    const response = await fetch(
      `${baseUrl}/coin/${id}/history?timePeriod=${timePeriod}`,
      {
        headers: cryptoApiHeaders,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    dispatch(fetchCryptoHistorySuccess(data));
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};

export default cryptoSlice.reducer;
