import axios from "axios";
import type {
  AuthResponse,
  RegisterDTO,
  IUser,
  LoginDTO,
} from "../../../../shared/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk<
  AuthResponse,
  RegisterDTO,
  {
    rejectValue: string;
  }
>("auth/createUser", async (credentials: RegisterDTO, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      credentials
    );
    return response.data;
  } catch (error: any) {
    const message = error?.data?.message || "Registration Failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginDTO,
  { rejectValue: string }
>("auth/loginUser", async (credentials: LoginDTO, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials
    );
    return response.data;
  } catch (error: any) {
    const message = error?.data?.message || "Login Failed!";
    return thunkAPI.rejectWithValue(message);
  }
});

export const getMe = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "auth/getMe",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No token!");
      }

      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Not authorized!");
    }
  }
);

// updateUser

interface UserState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;

          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(createUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;

          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Not authorized";
        state.isAuthenticated = false;
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
