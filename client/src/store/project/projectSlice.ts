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
    const token = localStorage.getItem("token");
    const res = await axios.post<IProject>(
      "http://localhost:5000/api/projects",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error: any) {
    console.log("SERVER ERROR DATA:", error.response?.data);
    const message = error?.data?.message || "Server Error";
    return thunkAPI.rejectWithValue(message);
  }
});

interface UploadResoponse {
  success: boolean;
  message: string;
  images: Array<{ url: string; publicId: string }>;
  project: IProject;
}

interface UploadImagesPayload {
  projectId: string;
  formData: FormData;
}

export const uploadImageFiles = createAsyncThunk<
  IProject,
  UploadImagesPayload,
  { rejectValue: string }
>("images/uploadImageFiles", async ({ projectId, formData }, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post<UploadResoponse>(
      `http://localhost:5000/api/projects/${projectId}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data.project;
  } catch (error: any) {
    console.log("SERVER ERROR DATA:", error.response?.data);
    const message = error?.data?.message || "Server Error";
    return thunkAPI.rejectWithValue(message);
  }
});

interface ProjectState {
  items: IProject[];
  isLoading: boolean;
  isUploading: boolean;
  error: null | string;
}

const initialState: ProjectState = {
  items: [],
  isLoading: false,
  isUploading: false,
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
        },
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
        },
      )
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Server Err";
      })
      .addCase(uploadImageFiles.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(
        uploadImageFiles.fulfilled,
        (state, action: PayloadAction<IProject>) => {
          state.isUploading = false;
          const index = state.items.findIndex(
            (project) => project._id === action.payload._id,
          );
          if (index == -1) {
            state.items[index] = action.payload;
          }
        },
      )
      .addCase(uploadImageFiles.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.payload || "Server Err";
      });
  },
});

export default projectSlice.reducer;
