import { createBrowserRouter } from "react-router-dom";

// Layouts
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import DashBoardLayout from "../layout/dashBoardLayout";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import CoveragePage from "../pages/coverage/CoveragePage";
import SendParcel from "../pages/sendParcel/SendParcel";
import MyParcels from "../pages/dashBoard/myParcels/MyParcels";
import Payments from "../pages/dashBoard/Payment/Payments";
import PaymentHistory from "../pages/dashBoard/paymentHistory/PaymentHistory";
import BeARider from "../pages/dashBoard/BeARider/BeARider";
import PendingRider from "../pages/dashBoard/PendingRider";
import ActiveRider from "../pages/dashBoard/ActiveRider";
import TrackParcel from "../pages/dashBoard/TrackParcel";
import MakeAdmin from "../pages/dashBoard/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";

// Routes
import PrivateRoutes from "../routes/privateRoutes";
import AdminRoute from "../routes/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "coverage", element: <CoveragePage /> },
      { path: "forbidden", element: <Forbidden /> },

      {
        path: "BeARider",
        element: (
          <PrivateRoutes>
            <BeARider />
          </PrivateRoutes>
        ),
      },
      {
        path: "sendParcel",
        element: (
          <PrivateRoutes>
            <SendParcel />
          </PrivateRoutes>
        ),
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout />
      </PrivateRoutes>
    ),
    children: [
      // ✅ Normal user pages
      { path: "myParcels", element: <MyParcels /> },
      { path: "payment/:id", element: <Payments /> },
      { path: "paymentHistory", element: <PaymentHistory /> },
      { path: "trackParcel", element: <TrackParcel /> },

      // ✅ ADMIN ONLY PAGES
      {
        path: "pendingRiders",
        element: (
          <AdminRoute>
            <PendingRider />
          </AdminRoute>
        ),
      },
      {
        path: "activeRiders",
        element: (
          <AdminRoute>
            <ActiveRider />
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <AdminRoute>
            <MakeAdmin />
          </AdminRoute>
        ),
      },
    ],
  },
]);