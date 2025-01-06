import { LogOut, Settings, UserRound } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import LogoComponent from "./LogoComponent";

type Nav = {
  to?: string;
  icon: React.ReactNode;
  label: string;
};

const AuthLayout = () => {
  const navlist: Nav[] = [
    {
      icon: <Settings />,
      label: "Settings",
      to: "/settings",
    },
    {
      icon: <UserRound />,
      label: "Profile",
      to: "/profile",
    },
    {
      icon: <LogOut />,
      label: "Logout",
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 z-10 flex h-14 w-full items-center justify-between bg-base-300 px-3">
        <NavLink
          to={"/"}
          className="flex items-center justify-center space-x-1"
        >
          {" "}
          <LogoComponent /> <p className="text-3xl font-bold">Chatty</p>
        </NavLink>
        <div className="space-x-2">
          {navlist.map((nav: Nav) => (
            <Navlink
              key={nav.label}
              icon={nav.icon}
              label={nav.label}
              to={nav.to}
            />
          ))}
        </div>
      </header>
      <div className="pt-14">
        <Outlet />
      </div>
    </div>
  );
};

const Navlink: React.FC<Nav> = ({ icon, label, to }) => {
  return (
    <NavLink to={to!} className="btn">
      {icon}
      <p className="hidden md:block">{label}</p>
    </NavLink>
  );
};

export default AuthLayout;
