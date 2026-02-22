import React from 'react';
import { Link, NavLink } from 'react-router';
import ProFastLogo from '../ProFastLogo/ProFastLogo';

const NavBar = () => {
    const navItems = <>
        <li><NavLink to='/' className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>Home</NavLink></li>
        <li><NavLink to='/sendParcel' className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>Send Parcel</NavLink></li>
        <li><NavLink to='/coverage' className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>Coverage</NavLink></li>
        <li><NavLink to='/about' className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>About us</NavLink></li>
    </>

    return (
        <div className="navbar bg-white shadow-md px-4 lg:px-8">
            {/* Left */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow-lg">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl normal-case">
                    <ProFastLogo />
                </a>
            </div>

            {/* Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navItems}
                </ul>
            </div>

            {/* Right */}
            <div className="navbar-end flex gap-2">
                <Link 
                    to='/login' 
                    className='px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 transition duration-300'>
                    Log In
                </Link>
                <Link 
                    to='/register' 
                    className='px-4 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow hover:from-green-500 hover:to-teal-600 transition duration-300'>
                    Register
                </Link>
            </div>
        </div>
    );
};

export default NavBar;