// Login.js
import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  return { email, password };
};

function Login() {
  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      if (userData.email.trim() && userData.password.trim()) {
        signInWithEmail(userData.email, userData.password);
      }
      if (!userData.email.trim()) {
        setErrors((prev) => ({ ...prev, email: "Input error" }));
      }
      if (!userData.password.trim()) {
        setErrors((prev) => ({ ...prev, password: "Input error" }));
      }
    }
  }, [userData]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source
          src="../../public/8447370-uhd_4096_2160_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <Form
        method="post"
        className="w-full  max-w-md glass opacity-95 p-8 rounded-lg shadow-lg z-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Login</h1>
        <div className="h-1 bg-purple-700 rounded-sm mb-4"></div>
        <FormInput
          type="email"
          name="email"
          labelText="Email"
          status={errors.email}
          className="mb-4 "
        />
        <FormInput
          type="password"
          name="password"
          labelText="Password"
          status={errors.password}
          className="mb-6"
        />
        <div className="mt-6">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full h-12 rounded-lg text-white font-medium ${
              isPending ? "bg-gray-400" : "bg-[#7D2AE8]"
            } transition-colors duration-300`}>
            {isPending ? "Loading..." : "Login"}
          </button>
        </div>
        <h3 className="text-black text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="text-[#41137d] font-medium">Register</span>
          </Link>
        </h3>
      </Form>
    </div>
  );
}

export default Login;
