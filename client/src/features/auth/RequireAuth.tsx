import useStore from "@/store/useStore";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = () => {
  const { isAuthenticated } = useStore();
  const location = useLocation();

  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate state={{ from: location }} to="/" replace={true} />
      )}
    </>
  );
};

export default RequireAuth;
