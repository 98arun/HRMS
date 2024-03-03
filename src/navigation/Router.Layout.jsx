import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import ProtectedView from "./ProtectedView";
import React, { Suspense } from "react";

const Employee = React.lazy(() => import("../pages/Employee"));
const Manager = React.lazy(() => import("../pages/Manager"));
const Hr = React.lazy(() => import("../pages/Hr"));
const Login = React.lazy(() => import("../pages/Login"));

export const routesMap = {
  root: "/",
  employee: "/employee",
  manager: "/manager",
  hr: "/hr",
};

const router = createBrowserRouter([
  {
    path: routesMap.root,
    element: (
      <Suspense fallback={<div className="loader"></div>}>
        <ProtectedView>
          <Login />
        </ProtectedView>
      </Suspense>
    ),
  },
  {
    path: routesMap.employee,
    element: (
      <Suspense fallback={<div className="loader"></div>}>
        <ProtectedView>
          <Employee />
        </ProtectedView>
      </Suspense>
    ),
  },
  {
    path: routesMap.manager,
    element: (
      <Suspense fallback={<div className="loader"></div>}>
        <ProtectedView>
          <Manager />
        </ProtectedView>
      </Suspense>
    ),
  },
  {
    path: routesMap.hr,
    element: (
      <Suspense fallback={<div className="loader"></div>}>
        <ProtectedView>
          <Hr />
        </ProtectedView>
      </Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<div className="loader"></div>}>
        <>
          <h1>Oops! It is 404</h1>
          <div>
            <Link to={routesMap.root}>Go to home</Link>
            <br />
            <Link to={routesMap.root}>Go to Login</Link>
          </div>
        </>
      </Suspense>
    ),
  },
]);

const Navigation = () => {
  return <RouterProvider router={router} />;
};

export default Navigation;
