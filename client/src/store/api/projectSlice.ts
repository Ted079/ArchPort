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

interface ProjectFilter {
  authorId?: string;
  category?: string;
  sort?: string;
  limit?: number;
  page?: number;
  search?: string;
  tags?: string[];
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
    // getProjects: builder.query<ProjectsResponse, string>({
    //   query: () => "/projects",
    //   providesTags: (result, error, params) => [{ type: "Project" }],
    // }),

    getOneProject: builder.query<IProject, string>({
      query: (id: string) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),

    getProjectsWithFilters: builder.query<ProjectsResponse, ProjectFilter>({
      query: (params: object) => buildUrl3("/projects", params),
      providesTags: (result, params) => [{ type: "Project", params }],
    }),

    // getProjectByCategory: builder.query<ProjectsResponse, string>({
    //   query: (category: string) => `projects?category=${category}`,
    //   providesTags: (result, error, category) => [
    //     { type: "Project", category },
    //   ],
    // }),
  }),
});

export const {
  // useGetProjectsQuery,
  useGetOneProjectQuery,
  // useGetProjectByCategoryQuery,
  useGetProjectsWithFiltersQuery,
} = projectSlice;
