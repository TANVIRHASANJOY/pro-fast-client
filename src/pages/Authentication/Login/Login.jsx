import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContexts/AuthContext";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
import { FiEye, FiEyeOff } from "react-icons/fi"; // ✅ Eye icons

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false); // ✅ Toggle state
  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        navigate("/"); // Redirect to Home
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        {/* Password with toggle */}
        <div className="relative">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"} // ✅ Toggle input type
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters required" },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
            onClick={togglePassword}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
          <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>

      <SocialLogIn />

      <p className="mt-4 text-center text-gray-600">
        Don’t have an account?{" "}
        <Link className="text-green-600 font-semibold hover:underline" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;