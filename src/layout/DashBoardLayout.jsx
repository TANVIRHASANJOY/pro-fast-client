import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const DashBoardLayout = () => {
  const { loading: authLoading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  // Loader while auth or admin check is in progress
  if (authLoading || isAdminLoading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? 'bg-green-600 text-white shadow-lg shadow-green-900/20'
        : 'hover:bg-slate-800'
    }`;

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col p-4 lg:p-10">
        {/* Mobile Header */}
        <div className="flex items-center justify-between lg:hidden mb-6 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-green-600">Pro-Fast</h2>
          <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button">
            ☰
          </label>
        </div>

        {/* Outlet Content */}
        <div className="bg-white min-h-[85vh] rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-slate-900 text-slate-300">
          
          {/* Brand */}
          <div className="flex items-center gap-2 px-4 py-6 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-black text-xl">
              P
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Pro-Fast</h2>
          </div>

          {/* ================= USER MENU ================= */}
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            User Menu
          </p>

          <li className="mb-2">
            <NavLink to="/sendParcel" className={linkClass}>
              ➕ Book Parcel
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink to="/dashboard/myParcels" className={linkClass}>
              📦 My Parcels
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink to="/dashboard/trackParcel" className={linkClass}>
              📍 Track Parcel
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink to="/dashboard/paymentHistory" className={linkClass}>
              💳 Payment History
            </NavLink>
          </li>

          {/* ================= RIDER SECTION ================= */}
          <div className="divider before:bg-slate-800 after:bg-slate-800 my-4"></div>

          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            Rider Panel
          </p>

          <li className="mb-2">
            <NavLink to="/dashboard/pendingDeliveries" className={linkClass}>
              🚚 Pending Deliveries
            </NavLink>
          </li>
          <li className="mb-2">
  <NavLink to="/dashboard/completeDelivery" className={linkClass}>
    ✅ Completed Deliveries
  </NavLink>
</li>

          {/* ================= ADMIN ONLY SECTION ================= */}
          {isAdmin && (
            <>
              <div className="divider before:bg-slate-800 after:bg-slate-800 my-4"></div>

              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                Rider Management
              </p>

              <li className="mb-2">
                <NavLink to="/dashboard/pendingRiders" className={linkClass}>
                  ⏳ Pending Riders
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to="/dashboard/activeRiders" className={linkClass}>
                  ✅ Active Riders
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to="/dashboard/assignRider" className={linkClass}>
                  🏍 Assign Rider
                </NavLink>
              </li>

              <div className="divider before:bg-slate-800 after:bg-slate-800 my-4"></div>

              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Admin Controls
              </p>

              <li className="mb-2">
                <NavLink to="/dashboard/makeAdmin" className={linkClass}>
                  🛡 Make Admin
                </NavLink>
              </li>
            </>
          )}

          {/* ================= HOME ================= */}
          <div className="divider before:bg-slate-800 after:bg-slate-800 my-4"></div>

          <li>
            <NavLink to="/" className={linkClass}>
              🏠 Home
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;