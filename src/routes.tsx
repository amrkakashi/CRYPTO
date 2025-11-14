import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import CoinPage from "./pages/Coin";

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
        path: "coins/:coin",
        element: <CoinPage />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
];
