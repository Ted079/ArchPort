import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProjects } from "../../store/project/projectSlice";
import UserInfo from "./UserInfo";
import ProjectList from "../../components/Project/ProjectList";
import CategoriesList from "../../components/Categories/CategoriesList";

const Profile = () => {
  const dispacth = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (user?._id) {
      dispacth(getProjects(user._id));
    }
    // dispacth(getProjects())
  }, [dispacth, user?._id]);

  return (
    <div>
      {/* Если данных пользователя еще нет, можно показать скелетон или null */}
      {user ? <UserInfo user={user} /> : <p>Loading...</p>}
      <CategoriesList />

      <ProjectList items={items} mode="dashboard" />
    </div>
  );
};

export default Profile;
