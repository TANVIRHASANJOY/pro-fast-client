import React from 'react';
import authImage from '../assets/authImage.png';
import logo from '../assets/logo.png';
import { Outlet } from 'react-router-dom';
import ProFastLogo from '../pages/Home/Shared/ProFastLogo/ProFastLogo';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Top Logo - Full Width Left */}
      <div className="w-full border-b px-10 py-6 bg-white">
        {/* <img src={logo} alt="Logo" className="h-10" /> 
        */}
        <ProFastLogo></ProFastLogo>
      </div>

      {/* Centered Auth Box */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">

        <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* Left Side - Form */}
          <div className="p-12 flex items-center justify-center">
            <Outlet />
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:flex items-center justify-center bg-green-50 p-10">
            <img
              src={authImage}
              alt="Auth Visual"
              className="w-80 object-contain"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
