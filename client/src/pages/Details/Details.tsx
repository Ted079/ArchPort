import React from "react";
import { logOut } from "../../store/user/authSlice";
import { useAppDispatch } from "../../store";

const Details = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button className="w-md bg-blue-500" onClick={() => dispatch(logOut())}>Log Out</button>
    </div>
  );
};

export default Details;
