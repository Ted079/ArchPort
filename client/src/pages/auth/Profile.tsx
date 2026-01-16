import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProjects } from "../../store/project/projectSlice";

const Profile = () => {
  const dispacth = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { items } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (user?._id) {
      dispacth(getProjects(user._id));
    }
  }, [dispacth]);

  console.log(items)
  return (
    <div>
      Homeeeeeeeeee!
      {/* {projects.map((item) => (

      ))} */}
    </div>
  );
};

export default Profile;

