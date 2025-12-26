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
  }, [token, user, dispatch]);
  return <>{children}</>;
};

export default AuthProvider;
