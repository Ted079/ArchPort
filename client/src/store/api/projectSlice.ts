import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProject } from "../../../../shared/types";
import { BASE_URL } from "../../utils/constants";

export const projectSlice = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getOneProject: builder.query<IProject, string>({
      query: (id: string) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),

    getProjectByAuthor: builder.query<IProject[], string>({
      query: (authorId: string) => `projects?authorId=${authorId}`,
      providesTags: (result, error, authorId) => [
        { type: "Project", id: `AUTHOR_${authorId}` },
      ],
    }),

    getProjectByCategory: builder.query<IProject[], string>({
      query: (category: string) => `projects?category=${category}`,
      providesTags: (result, error, category) => [
        { type: "Project", category },
      ],
    }),
  }),
});

export const {
  useGetOneProjectQuery,
  useGetProjectByAuthorQuery,
  useGetProjectByCategoryQuery,
} = projectSlice;
