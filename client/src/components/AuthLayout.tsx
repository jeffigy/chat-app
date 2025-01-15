import { Loader, LogOut, Settings, UserRound } from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import LogoComponent from "./LogoComponent";
import { useLogoutMutation } from "@/features/auth/authMutation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import useStore from "@/store/useStore";
import { disconnectSocket } from "@/lib/socket";

type Nav = {
  to?: string;
  icon: React.ReactNode;
  label: string;
};

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
];

const AuthLayout = () => {
  const { mutateAsync: logout, isPending } = useLogoutMutation();
  const { clearCredentials, setSelectedUser } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async (e: any) => {
    e.preventDefault();

    try {
      await logout(undefined, {
        onSuccess: (data) => {
          clearCredentials();
          setSelectedUser(null);
          disconnectSocket();
          toast.success(data.message);
          navigate("/", {
            replace: true,
            state: {
              from: location,
            },
          });
        },
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

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
          <button onClick={handleLogout} className="btn">
            {isPending ? <Loader className="animate-spin" /> : <LogOut />}
            <p className="hidden md:block">Logout</p>
          </button>
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
