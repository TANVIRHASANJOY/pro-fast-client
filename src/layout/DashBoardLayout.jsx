import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
    return (
        // Added 'bg-base-200' to the whole container to prevent the "white-out" look
        <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            
            {/* Main Content Area */}
            <div className="drawer-content flex flex-col p-6 lg:p-10">
                {/* Mobile Header */}
                <div className="flex items-center justify-between lg:hidden mb-6 bg-white p-4 rounded-xl shadow-sm">
                    <h2 className="text-xl font-bold text-green-600">Pro-Fast</h2>
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                </div>

                {/* Content Wrapper: Added white background and sharp shadow for visibility */}
                <div className="bg-white min-h-[80vh] rounded-2xl shadow-xl p-6 border border-gray-100">
                    <Outlet /> 
                </div>
            </div> 

            {/* Sidebar */}
            <div className="drawer-side z-40">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-72 min-h-full bg-slate-900 text-slate-300">
                    {/* Brand Identity */}
                    <div className="flex items-center gap-2 px-4 py-6 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-black text-xl">P</div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Pro-Fast</h2>
                    </div>

                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">User Menu</p>
                    
                    {/* Navigation Links with Active States */}
                    <li className="mb-1">
                        <NavLink 
                            to="/dashboard/myParcels" 
                            className={({ isActive }) => 
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' : 'hover:bg-slate-800'}`
                            }
                        >
                            <span className="text-lg">📦</span> My Parcels
                        </NavLink>
                    </li>
                    <li className="mb-1">
                        <NavLink 
                            to="/sendParcel" 
                            className={({ isActive }) => 
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' : 'hover:bg-slate-800'}`
                            }
                        >
                            <span className="text-lg">➕</span> Book Parcel
                        </NavLink>
                    </li>

                    <div className="divider before:bg-slate-800 after:bg-slate-800 my-6"></div>

                    <li>
                        <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
                            <span className="text-lg">🏠</span> Home
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;