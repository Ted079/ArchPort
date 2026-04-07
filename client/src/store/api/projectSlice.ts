import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProject } from "../../../../shared/types";
import { BASE_URL } from "../../utils/constants";

export const projectSlice = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getOneProject: builder.query<IProject, string>({
      query: (id: string) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
  }),
});

export const { useGetOneProjectQuery } = projectSlice;


//переписать slice на rtk
// https://chatgpt.com/c/69d4b676-4654-832c-b2be-e4bf4173dfd4