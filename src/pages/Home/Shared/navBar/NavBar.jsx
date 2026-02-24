import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import ProFastLogo from "../ProFastLogo/ProFastLogo";
import { AuthContext } from "../../../../Contexts/AuthContexts/AuthContext";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/sendParcel">Send Parcel</NavLink></li>
      {
        user &&  <>
         <li><NavLink to="/dashBoard">DashBoard</NavLink></li>
        </>
      }
      <li><NavLink to="/coverage">Coverage</NavLink></li>
      <li><NavLink to="/about">About us</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-md px-4 lg:px-8">
      <div className="navbar-start">
        <ProFastLogo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navItems}
        </ul>
      </div>

      <div className="navbar-end flex gap-2">
        {user ? (
          <button
            onClick={logOut}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;