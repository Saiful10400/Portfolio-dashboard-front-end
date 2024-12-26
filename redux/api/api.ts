import getToken from "@/utils/getToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    // baseUrl: "https://front-end-blush-pi.vercel.app/api/v1",
    prepareHeaders: (headers) => {
      if (getToken()) headers.set("Authorization", getToken() as string);
    },
    
  }),
  tagTypes:["personalInfo","blog","project"],
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (payload) => ({
          url: "auth/login",
          method: "POST",
          body: payload,
        }),
      }),
      personalInfo: builder.query({
        query: () => ({
          url: "all/personalInfo",
          method: "GET",
        }),
        providesTags:["personalInfo"]
      }),
      updatePersonalInfo: builder.mutation({
        query: (payload) => ({
          url: "all/personalInfoUpdate",
          method: "POST",
          body: payload,
        }),
        invalidatesTags:["personalInfo"]
      }),
      createBlog: builder.mutation({
        query: (payload) => ({
          url: "all/createBlog",
          method: "POST",
          body: payload,
        }),
        invalidatesTags:["blog"]
      }),
      allBlogs: builder.query({
        query: () => ({
          url: "all/blog",
          method: "GET",
        }),
        providesTags:["blog"]
      }),
      createProject: builder.mutation({
        query: (payload) => ({
          url: "all/createProject",
          method: "POST",
          body: payload,
        }),
        invalidatesTags:["project"]
      }),
      allProjects: builder.query({
        query: () => ({
          url: "all/project",
          method: "GET",
        }),
        providesTags:["project"]
      })
    };
  },
});

export const {
  useLoginMutation,
  usePersonalInfoQuery,
  useUpdatePersonalInfoMutation,
  useCreateBlogMutation,
  useAllBlogsQuery,
  useAllProjectsQuery,
  useCreateProjectMutation
} = baseApi;
