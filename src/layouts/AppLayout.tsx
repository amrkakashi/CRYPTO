
// ROUTES.TSX
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

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

export default AppLayout;
