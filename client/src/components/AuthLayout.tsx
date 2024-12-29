import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 z-10 flex h-14 w-full bg-base-300"></header>
      <div className="pt-14">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
