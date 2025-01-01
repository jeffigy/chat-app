import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useSignupMutation } from "./authMutation";
import { Loader } from "lucide-react";
import useStore from "@/store/useStore";

const SignupForm = () => {
  const { setCredentials } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { isPending, mutateAsync: signup } = useSignupMutation();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup(
        { fullName, email, password },
        {
          onSuccess: (data) => {
            setCredentials(data.accessToken);
          },
        },
      );
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="w-full max-w-sm space-y-8">
      <input
        value={fullName}
        onChange={({ target }) => setFullName(target.value)}
        type="text"
        className="input input-bordered w-full"
        placeholder="Full Name"
      />
      <input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        type="text"
        className="input input-bordered w-full"
        placeholder="Email"
      />

      <input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        type="text"
        className="input input-bordered w-full"
        placeholder="Password"
      />
      <button
        disabled={!email || !password || !fullName}
        className="btn btn-primary w-full"
      >
        {isPending ? (
          <>
            <Loader className="animate-spin" /> Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default SignupForm;
