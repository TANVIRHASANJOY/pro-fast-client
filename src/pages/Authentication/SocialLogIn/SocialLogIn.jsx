import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const SocialLogIn = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        navigate("/"); // ✅ Redirect to Home
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="mt-4">
      <p className="text-center text-gray-500 mb-2">or</p>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg bg-white text-black hover:bg-gray-100 transition"
      >
        <svg
          aria-label="Google logo"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="M0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogIn;