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
import AssignRider from "../pages/dashBoard/AssignRider/AssignRider";
import PendingDeliveris from "../pages/dashBoard/PendingDeliveris";
import Forbidden from "../pages/Forbidden/Forbidden";

// Routes
import PrivateRoutes from "../routes/privateRoutes";
import AdminRoute from "../routes/AdminRoute";
import RiderRoute from "../routes/RiderRoute";
import CompleteDelivery from "../pages/dashBoard/CompleteDelivery";
import AboutUs from "../pages/Home/About/AboutUs";
import DashboardHome from "../pages/dashBoard/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "coverage", element: <CoveragePage /> },
      {
path:'about',
Component:AboutUs,
      },
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
      {
index:true, Component:DashboardHome,
      },
      // USER
      { path: "myParcels", element: <MyParcels /> },
      { path: "payment/:id", element: <Payments /> },
      { path: "paymentHistory", element: <PaymentHistory /> },
      { path: "trackParcel", element: <TrackParcel /> },

      // RIDER ONLY
      {
        path: "pendingDeliveries",
        element: (
          <RiderRoute>
            <PendingDeliveris />
          </RiderRoute>
        ),
      },
        {
        path: "completeDelivery",
        element: (
          <RiderRoute>
            <CompleteDelivery></CompleteDelivery>
          </RiderRoute>
        ),
      },

      // ADMIN ONLY
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
        path: "assignRider",
        element: (
          <AdminRoute>
            <AssignRider />
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