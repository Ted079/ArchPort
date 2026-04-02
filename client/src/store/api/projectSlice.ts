import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProject } from "../../../../shared/types";

export const projectSlice = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getOneProject: builder.query<IProject, string>({
      query: (id: string) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
  }),
});

export const { useGetOneProjectQuery } = projectSlice;
