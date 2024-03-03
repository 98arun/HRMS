import { Navigate, useLocation } from "react-router-dom";
import { useProfile } from "../contexts/Profile.Context";
import { routesMap } from "./Router.Layout";

const roles = {
  employee: ["/employee"],
  manager: ["/manager"],
  hr: ["/hr"],
};

const ProtectedRoute = ({ children }) => {
  const { profile } = useProfile();
  const { pathname } = useLocation();
  // console.log("PV:", profile);

  const pathLC = pathname.toLowerCase();
  const currentUserRole = profile?.role?.toLowerCase();

  if (!profile?.role && pathname !== routesMap.root) {
    return <p>Please wait!</p>;
  }

  if (profile?.role && pathname === routesMap.root) {
    return <Navigate to={`/${currentUserRole}`} replace={true} />;
  }

  if (
    (!profile || Object.keys(profile).length === 0) &&
    pathname === routesMap.root
  ) {
    return children;
  }

  if (Object.keys(profile).length === 0 && pathname !== routesMap.root) {
    return <Navigate to="/" replace={true} />;
  }

  if (!roles[currentUserRole].includes(pathLC)) {
    return <Navigate to={`/${currentUserRole}`} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
