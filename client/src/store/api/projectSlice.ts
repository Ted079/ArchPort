import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProject } from "../../../../shared/types";
import { BASE_URL } from "../../utils/constants";
import { buildUrl3 } from "../../utils/common";

interface ProjectsResponse {
  projects: IProject[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

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

    getProjects: builder.query<ProjectsResponse, string>({
      query: () => "/projects",
      providesTags: (result, error, params) => [{ type: "Project" }],
    }),

    getProjectByAuthor: builder.query<IProject[], string>({
      query: (authorId: string) => `projects?authorId=${authorId}`,
      providesTags: (result, error, authorId) => [
        { type: "Project", id: `AUTHOR_${authorId}` },
      ],
    }),

    getProjectByCategory: builder.query<ProjectsResponse, string>({
      query: (category: string) => `projects?category=${category}`,
      providesTags: (result, error, category) => [
        { type: "Project", category },
      ],
    }),
    getProjectsWithFilters: builder.query<ProjectsResponse, object>({
      query: (params: object) => buildUrl3("/projects", params),
      providesTags: (result, error, params) => [{ type: "Project", params }],
    }),
  }),
});

export const {
  useGetOneProjectQuery,
  useGetProjectByAuthorQuery,
  useGetProjectByCategoryQuery,
  useGetProjectsQuery,
  useGetProjectsWithFiltersQuery,
} = projectSlice;
