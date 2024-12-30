import { Loader } from "lucide-react";
import { useLoginMutation } from "./authMutation";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, mutateAsync: login } = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ email, password });
      toast.success(accessToken);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm space-y-8">
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
        disabled={!email || !password}
        type="submit"
        className="btn btn-primary w-full"
      >
        {isPending ? (
          <>
            <Loader className="animate-spin" /> Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
