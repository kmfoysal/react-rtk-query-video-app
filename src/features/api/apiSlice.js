import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),

  tagTypes: ["Videos", "Video", "RelatedVideos"],

  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 500,
      providesTags: ["Videos"],
    }),

    getSingleVideo: builder.query({
      query: (vidioId) => `/videos/${vidioId}`,

      providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
    }),

    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");

        const relatedTags = tags.map((tag) => `title_like=${tag}`);

        const queryString = `/videos?${relatedTags.join("&")}&_limit=4`;

        return queryString;
      },
      providesTags: (result, error, arg) => [{ type: "Video", id: arg.id }],
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),

    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.id },
        { type: "RelatedVideos", id: arg.id },
      ],
    }),

    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:  [ "Videos"],
    }),
  }),
});

export const {useGetVideosQuery, useGetSingleVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation} = apiSlice;