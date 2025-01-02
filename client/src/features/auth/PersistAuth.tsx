import useStore from "@/store/useStore";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRefreshMutation } from "./authMutation";

const PersistAuth = () => {
  const navigate = useNavigate();
  const { token, setCredentials } = useStore();
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const {
    mutateAsync: refresh,
    isPending,
    isSuccess,
    isError,
    isIdle,
    error,
  } = useRefreshMutation();

  useEffect(() => {
    const shouldRunEffect =
      effectRan.current === true || process.env.NODE_ENV !== "developement";

    if (shouldRunEffect) {
      async function verifyRefreshToken() {
        console.log("verifying refresh token");

        try {
          await refresh(undefined, {
            onSuccess: (data) => {
              setCredentials(data.accessToken);
            },
          });
          setTrueSuccess(true);
        } catch (error: unknown) {
          console.error("Token refresh failed:", error);
        }
      }
      if (!token) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  if (isPending) return <p>loading...</p>;
  if (isError)
    return (
      <p>
        {`${error.message} - `}{" "}
        <button onClick={() => navigate("/", { replace: true })}>
          login again
        </button>
      </p>
    );

  if (isSuccess && trueSuccess) return <Outlet />;
  if (token && isIdle) return <Outlet />;
};

export default PersistAuth;
