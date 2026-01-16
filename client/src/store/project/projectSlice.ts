import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  CreateProjectDTO,
  IProject,
} from "../../../../shared/types/project.types";
import axios from "axios";

export const getProjects = createAsyncThunk<
  IProject[],
  string | undefined, // authorId
  { rejectValue: string }
>("project/getProjects", async (authorId, thunkAPI) => {
  try {
    const url = authorId
      ? `http://localhost:5000/api/projects?authorId=${authorId}`
      : `http://localhost:5000/api/projects`;
    const res = await axios.get<IProject[]>(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error");
  }
});

export const createProject = createAsyncThunk<
  IProject,
  CreateProjectDTO,
  { rejectValue: string }
>("project/createProject", async (payload, thunkAPI) => {
  try {
    const res = await axios.post<IProject>(
      "http://localhost:5000/api/projects",
      payload
    );
    return res.data;
  } catch (error: any) {
    const message = error?.data?.message || "Server Error";
    return thunkAPI.rejectWithValue(message);
  }
});

interface ProjectState {
  items: IProject[];
  isLoading: boolean;
  error: null | string;
}

const initialState: ProjectState = {
  items: [],
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProjects.fulfilled,
        (state, action: PayloadAction<IProject[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Server Err";
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<IProject>) => {
          state.isLoading = false;
          state.items.push(action.payload);
        }
      )
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Server Err";
      });
  },
});

export default projectSlice.reducer;
