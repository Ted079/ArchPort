import { Route, Routes } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { ROUTES } from "../../utils/route";
import Home from "../../pages/Home/Home";
import Details from "../../pages/Details/Details";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.DETAILS} element={<Details />} />
        </Route>
      </Route>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
