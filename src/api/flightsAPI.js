import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flightsApi = createApi({
  reducerPath: "flightsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URI }),
  tagTypes: ["Flights"],
  endpoints: (builder) => ({
    getAllFlights: builder.query({
      query: () => "flights",
      providesTags: ["Flights"],
    }),
    getFlights: builder.query({
      query: ({ origin, destination, departureDate }) =>
        `flights?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(
          destination
        )}&departureDate=${encodeURIComponent(departureDate)}`,
      providesTags: ["Flights"],
    }),
    getFlightById: builder.query({
      query: (id) => `flights/${id}`,
      providesTags: ["Flights"],
    }),
    updateFlight: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `flights/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Flights", id }, "Flights"],
    }),
  }),
});

export const {
  useGetAllFlightsQuery,
  useGetFlightsQuery,
  useGetFlightByIdQuery,
  useUpdateFlightMutation,
} = flightsApi;
