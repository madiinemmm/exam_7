import { Form, useActionData, Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { FormInput } from "../components";

export const action = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email");
  const password = formData.get("password");
  const displayName = formData.get("displayName");
  const photoURL = formData.get("photoURL");
  return { email, password, displayName, photoURL };
};

function Register() {
  const userData = useActionData();
  const { registerWithEmail, isPending } = useRegister();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    displayName: "",
    photoURL: "",
  });

  useEffect(() => {
    if (userData) {
      const { email, password, displayName, photoURL } = userData;
      if (
        email.trim() &&
        password.trim() &&
        displayName.trim() &&
        photoURL.trim()
      ) {
        registerWithEmail(email, password, displayName, photoURL).catch(
          (error) => {
            setErrors({
              email: error.message.includes("email") ? "Invalid email" : "",
              password: error.message.includes("password")
                ? "Invalid password"
                : "",
              displayName: error.message.includes("displayName")
                ? "Invalid display name"
                : "",
              photoURL: error.message.includes("photoURL")
                ? "Invalid photo URL"
                : "",
            });
          }
        );
      } else {
        setErrors({
          email: !email.trim() ? "Email is required" : "",
          password: !password.trim() ? "Password is required" : "",
          displayName: !displayName.trim() ? "Display name is required" : "",
          photoURL: !photoURL.trim() ? "Photo URL is required" : "",
        });
      }
    }
  }, [userData, registerWithEmail]);

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
        className="w-full max-w-md glass opacity-95 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Register</h1>
        <div className="h-1 bg-purple-700 rounded-sm mb-4"></div>
        <FormInput
          type="text"
          name="displayName"
          labelText="Display Name"
          status={errors.displayName}
          className="mb-4"
        />
        <FormInput
          type="url"
          name="photoURL"
          labelText="Photo URL"
          status={errors.photoURL}
          className="mb-4"
        />
        <FormInput
          type="email"
          name="email"
          labelText="Email"
          status={errors.email}
          className="mb-4"
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
              isPending ? "bg-gray-400" : "bg-purple-700"
            } transition-colors duration-300`}>
            {isPending ? "Registering..." : "Register"}
          </button>
        </div>
        <h3 className="text-black text-center mt-4">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#41137d] font-medium">Login</span>
          </Link>
        </h3>
      </Form>
    </div>
  );
}

export default Register;
