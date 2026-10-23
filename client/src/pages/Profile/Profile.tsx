import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProjects } from "../../store/project/projectSlice";
import UserInfo from "../../components/User/UserInfo";
import ProjectList from "../../components/Project/ProjectList";
import CategoriesList from "../../components/Categories/CategoriesList";
import Button from "../../components/UI/Button";
import { EditIcon } from "../../components/UI/icons";
import { PlusIcon } from "../../components/UI/icons/plusIcon";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/route";

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
      {/* <div>profile menu bar</div> */}
      <div className="flex-1 h-px bg-gray-200 mt-10 mb-10"></div>

      {items.length >= 1 ? (
        <ProjectList items={items} showAuthor={false} />
      ) : (
        <div className="contianer ">
          <Link
            to={ROUTES.PROJECT_CREATE}
            className="group flex w-[423px] h-[251px] flex-col items-center rounded-lg border-2 border-dashed  border-gray-200 bg-white px-6 py-10 shadow-xs transition-all duration-200  hover:bg-[#f3f3f6]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary transition-transform duration-200 group-hover:scale-110">
              <PlusIcon className="h-6 w-6" />
            </div>

            <h2 className="mt-4 text-center text-md font-bold text-gray-900">
              Start Adding Your Projects
            </h2>

            <p className="mt-2 text-center text-sm font-extralight text-gray-500">
              Showcase your architectural work, build your portfolio, and share
              your creative vision with the community.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
