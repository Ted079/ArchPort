import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { ROUTES } from "../../utils/route";
import Home from "../../pages/Home/Home";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";
import PrivateRoute from "./PrivateRoute";
import Profile from "../../pages/Profile/Profile";
import Upload from "../../pages/UploadProject/Upload";
import Edit from "../../pages/EditProject/Edit";
import Details from "../../pages/ProjectDetails/Details";
import Setting from "../../pages/Profile/Setting";
import ProjectGallery from "../../pages/ProjectImages/ProjectGallery";
import DetailsModal from "../DetailsModal/DetailsModal";
import SingleCategory from "../../pages/SingleCategory/SingleCategory";

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state?.background;
  return (
    <>
      <Routes location={background || location}>
        <Route element={<PrivateRoute />}></Route>
        <Route path={ROUTES.PROJECT_CREATE} element={<Upload />} />
        <Route path={ROUTES.PROJECT_EDIT} element={<Edit />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.PROJECT_DETAILS} element={<Details />} />
          <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.PROFILE_SETTINGS} element={<Setting />} />
          </Route>
        </Route>
        <Route path={ROUTES.PROJECT_IMAGES} element={<ProjectGallery />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
      </Routes>

      {/* {background && (
        <Routes>
          <Route path={ROUTES.PROJECT_DETAILS} element={<DetailsModal />} />
          <Route path={ROUTES.PROJECT_IMAGES} element={<ProjectGallery />} />
        </Routes>
      )} */}
    </>
  );
};

export default AppRoutes;
