import axios from "axios";
import type {
  AuthResponse,
  RegisterDTO,
  IUser,
} from "../../../../shared/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk<
  AuthResponse,
  RegisterDTO,
  {
    rejectValue: string;
  }
>("user/createUser", async (credentials: RegisterDTO, thunkAPI) => {
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

interface UserState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
          (state.token = action.payload.token), (state.isAuthenticated = true);
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(createUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || "Registration failed";
      });
  },
});

export default userSlice.reducer;
