import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),

  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getSingleVideo: builder.query({
      query: (vidioId) => `/videos/${vidioId}`,
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");

        const relatedTags = tags.map((tag) => `title_like=${tag}`);

        const queryString = `/videos?${relatedTags.join("&")}&_limit=4`;

        return queryString;
      },
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data
      }),
    }),
  }),
});

export const {useGetVideosQuery, useGetSingleVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation} = apiSlice;