import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import SocialLogIn from "../SocialLogIn/SocialLogIn";
import { AuthContext } from "../../../Contexts/AuthContexts/AuthContext";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        navigate("/"); // ✅ Redirect to Home
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Create a New Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          Sign Up
        </button>
      </form>

      <SocialLogIn />

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link className="text-green-600 font-semibold hover:underline" to="/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;