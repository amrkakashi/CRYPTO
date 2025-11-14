
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AppLayout = () => {
  const path = useLocation().pathname;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [path]);
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
