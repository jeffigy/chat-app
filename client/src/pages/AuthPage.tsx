import Pattern from "@/assets/auth-pattern.svg";
import LogoComponent from "@/components/LogoComponent";
import LoginForm from "@/features/auth/LoginForm";
import SignupForm from "@/features/auth/SignupForm";

import { useState } from "react";

const AuthPage = () => {
  const [isLogin, setisLogin] = useState(true);

  const handleChangeForm = (e: React.FormEvent) => {
    e.preventDefault();

    setisLogin(!isLogin);
  };
  return (
    <div className="flex h-screen w-full flex-col lg:flex-row">
      <div className="flex w-full grow flex-col items-center justify-center space-y-10 p-10">
        <div className="flex flex-col items-center">
          <LogoComponent />
          <h2 className="text-3xl font-bold">
            {isLogin ? "Welcome Back" : "Create account"}
          </h2>
          <p>
            {isLogin
              ? "Sign in to your account"
              : "Get started with your free account"}
          </p>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <p className="text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            className="cursor-pointer text-primary hover:underline"
            onClick={handleChangeForm}
          >
            {isLogin ? "Create account" : "Sign in"}
          </span>
        </p>
      </div>

      <div className="flex w-full grow">
        <img src={Pattern} alt="" className="object-cover" />
      </div>
    </div>
  );
};

export default AuthPage;
