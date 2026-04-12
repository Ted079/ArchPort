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
import { BASE_URL } from "../../utils/constants";

export const getProjects = createAsyncThunk<
  IProject[],
  string | undefined, // authorId
  { rejectValue: string }
>("project/getProjects", async (authorId, thunkAPI) => {
  try {
    const url = authorId
      ? `${BASE_URL}/projects?authorId=${authorId}`
      : `${BASE_URL}/projects`;
    const res = await axios.get<IProject[]>(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error");
  }
});

export const getProjByCat = createAsyncThunk<
  IProject[],
  string | undefined,
  { rejectValue: string }
>("category/getProjects", async (category, thunkAPI) => {
  try {
    const res = await axios.get<IProject[]>(
      `${BASE_URL}/projects?category=${category}`,
    );
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Server error");
  }
});

export const getAuthorProjects = createAsyncThunk<
  IProject[],
  string | undefined,
  { rejectValue: string }
>("project/authorProject", async (authorId, thunkAPI) => {
  try {
    const res = await axios.get<IProject[]>(
      `${BASE_URL}/projects?authorId=${authorId}`,
    );
    return res.data;
  } catch (error: any) {
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
    const res = await axios.post<IProject>(`${BASE_URL}/projects`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log("SERVER ERROR DATA:", error.response?.data);
    const message = error?.data?.message || "Server Error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteProj = createAsyncThunk<
  IProject,
  string,
  { rejectValue: string }
>("project/deleteProject", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${BASE_URL}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log("SERVER ERROR DATA:", error.response?.data);
    const message = error?.data?.message || "Server Error";
    return thunkAPI.rejectWithValue(message);
  }
});

interface UpdateProjectDTO extends CreateProjectDTO {
  _id: string;
}

export const updateProject = createAsyncThunk<
  IProject,
  UpdateProjectDTO,
  { rejectValue: string }
>("project/updateProject", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const { _id, ...data } = payload;
    const response = await axios.patch(`${BASE_URL}/projects/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
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
  currentImages?: string[];
}

export const uploadImageFiles = createAsyncThunk<
  IProject,
  UploadImagesPayload,
  { rejectValue: string }
>(
  "images/uploadImageFiles",
  async ({ projectId, formData, currentImages }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post<UploadResoponse>(
        `${BASE_URL}/projects/${projectId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          params: currentImages
            ? { currentImages: JSON.stringify(currentImages) }
            : {},
        },
      );
      return res.data.project;
    } catch (error: any) {
      console.log("SERVER ERROR DATA:", error.response?.data);
      const message = error?.data?.message || "Server Error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

interface ProjectState {
  items: IProject[];
  authorItems: IProject[];
  isLoading: boolean;
  isUploading: boolean;
  error: null | string;
  currentProj: IProject | null;

  categoryItems: IProject[];
}

const initialState: ProjectState = {
  items: [],
  authorItems: [],
  isLoading: false,
  isUploading: false,
  error: null,
  currentProj: null,

  categoryItems: [],
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

      .addCase(getAuthorProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAuthorProjects.fulfilled,
        (state, action: PayloadAction<IProject[]>) => {
          state.isLoading = false;
          state.authorItems = action.payload;
        },
      )

      .addCase(getAuthorProjects.rejected, (state, action) => {
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
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        },
      )
      .addCase(uploadImageFiles.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.payload || "Server Err";
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<IProject>) => {
          state.isLoading = false;
          const index = state.items.findIndex(
            (project) => project._id === action.payload._id,
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        },
      )
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Updated failed";
      })
      .addCase(deleteProj.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteProj.fulfilled,
        (state, action: PayloadAction<IProject>) => {
          state.isLoading = false;
          state.items = state.items.filter((p) => p._id !== action.payload._id);
        },
      )
      .addCase(deleteProj.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Deleted failed";
      })

      // ------------------------------
      .addCase(getProjByCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjByCat.fulfilled, (state, action: PayloadAction<IProject[]>) => {
        state.isLoading = false;
        state.categoryItems = action.payload;
      })
      .addCase(getProjByCat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Can not get Project by cat"
      });
  },
});

export default projectSlice.reducer;
