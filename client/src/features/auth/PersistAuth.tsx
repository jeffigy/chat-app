import useStore from "@/store/useStore";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRefreshMutation } from "./authMutation";
import { connectSocket } from "@/lib/socket";
import { Loader } from "lucide-react";

const PersistAuth = () => {
  const navigate = useNavigate();
  const { token, setCredentials } = useStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { mutateAsync: refresh, isPending } = useRefreshMutation();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      console.log("verifying refresh token");
      try {
        const data = await refresh();
        setCredentials(data.accessToken); // Save the token
      } catch (err) {
        navigate("/", { replace: true }); // Redirect to login if refresh fails
      } finally {
        if (isMounted) setIsCheckingAuth(false); // Allow rendering to continue
      }
    };

    if (!token) {
      verifyRefreshToken();
    } else {
      setIsCheckingAuth(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (token) {
      connectSocket();
    }
  }, [token]);

  if (isCheckingAuth || isPending)
    return (
      <div className="flex h-screen items-center">
        {" "}
        <Loader className="mx-auto animate-spin" />
      </div>
    );

  // Render child routes
  return <Outlet />;
};

export default PersistAuth;
