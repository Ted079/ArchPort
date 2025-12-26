import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";
import { ROUTES } from "../../utils/route";

const PrivateRoute = () => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

//   if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default PrivateRoute;
