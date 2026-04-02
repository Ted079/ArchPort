import { Route, Routes } from "react-router-dom";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}></Route>
      <Route path={ROUTES.UPLOADPROJECT} element={<Upload />} />
      <Route path={ROUTES.EDTIPROJECT} element={<Edit />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.PROJECTDETAILS} element={<Details />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.PROFILESETTINGS} element={<Setting />} />
        </Route>
      </Route>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
