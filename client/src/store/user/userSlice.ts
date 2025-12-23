import type { IUser } from "../../../../shared/types/user.types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: IUser | null;
  token: string | null
  isAuthenticated: boolean;
  isLoading: boolean,
  error: string,
}

const initialState: UserState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
