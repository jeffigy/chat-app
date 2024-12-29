import { MessagesSquare } from "lucide-react";

const SignupForm = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="rounded-md bg-base-100 p-3">
          <MessagesSquare />
        </div>
        <h2 className="text-3xl font-bold">Create account</h2>
        <p>Get started with your free account</p>
      </div>
      <div className="w-full max-w-sm space-y-8">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Email"
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Name"
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Password"
        />
        <button className="btn btn-primary w-full">Create Account</button>
      </div>
    </>
  );
};

export default SignupForm;
