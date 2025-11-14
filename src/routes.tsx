// ROUTES.TSX
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AppLayout from "./layouts/AppLayout";

export const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];
