import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 z-10 flex h-14 w-full bg-base-300"></div>
      <div className="mt-14">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
