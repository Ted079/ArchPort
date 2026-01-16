import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getMe } from "../../store/user/authSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [token,  dispatch]);
  return <>{children}</>;
};

export default AuthProvider;








// import axios from "axios";
// import type {
//   CreateProjectDTO,
//   IProject,
// } from "../../../../shared/types/project.types";
// import {
//   createAsyncThunk,
//   createSlice,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import reducer from "../user/authSlice";

// export const creatProject = createAsyncThunk<
//   IProject,
//   CreateProjectDTO,
//   { rejectValue: string }
// >("project, createProject", async (payload: CreateProjectDTO, thunkAPI) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/projects",
//       payload
//     );
//     return response.data;
//   } catch (error: any) {
//     const message = error?.data?.message || "err";
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// export const getProjects = createAsyncThunk<
//   IProject[],
//   string | undefined,
//   { rejectValue: string }
// >("project/getProjects", async (authorId, thunkAPI) => {
//   try {
//     const url = authorId
//       ? `http://localhost:5000/api/projects?authorId=${authorId}`
//       : `http://localhost:5000/api/projects`;
//     const response = await axios.get<IProject[]>(url);
//     return response.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue("Server error");
//   }
// });

// interface ProjectState {
//   projects: IProject[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: ProjectState = {
//   projects: [],
//   isLoading: false,
//   error: null,
// };

// const projectSlice = createSlice({
//   name: "project",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(creatProject.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(
//         creatProject.fulfilled,
//         (state, action: PayloadAction<IProject>) => {
//           state.isLoading = false;
//           state.projects.push(action.payload);
//         }
//       )
//       .addCase(creatProject.rejected, (state, { payload }) => {
//         state.isLoading = false;
//         state.error = payload || "Cant create Project";
//       })
//       .addCase(getProjects.fulfilled, (state, actions) => {
//         (state.isLoading = false), (state.projects = actions.payload);
//       });
//   },
// });

// export default projectSlice.reducer;
