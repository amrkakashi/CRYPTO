
// ROUTES.TSX
import { Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-[64px]">
        <Outlet />
      </div>
    </>
  );
};

export const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }
];
