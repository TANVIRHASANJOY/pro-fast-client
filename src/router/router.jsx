import { createBrowserRouter } from "react-router";
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
import PaymentHistory from '../pages/dashBoard/paymentHistory/PaymentHistory';
import BeARider from "../pages/dashBoard/BeARider/BeARider";



// Routes
import PrivateRoutes from "../routes/privateRoutes";
import PendingRider from "../pages/dashBoard/PendingRider";
import ActiveRider from "../pages/dashBoard/ActiveRider";
import TrackParcel from "../pages/dashBoard/TrackParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout, 
    children: [
      { index: true, Component: Home },
      { path: 'coverage', Component: CoveragePage },
      { 
        path:'BeARider',
        element: <PrivateRoutes><BeARider /></PrivateRoutes>
      },
      { 
        path: 'sendParcel',
        element: <PrivateRoutes><SendParcel /></PrivateRoutes> 
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      { path: 'login', Component: Login },
      { path: 'register', Component: Register }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <DashBoardLayout />
      </PrivateRoutes>
    ),
    children: [
      { path: 'myParcels', Component: MyParcels },
      { path: 'payment/:id', Component: Payments },
      { path: 'paymentHistory', Component: PaymentHistory },
      { path: 'pendingRiders', Component: PendingRider }, // ✅ Added Pending Riders
      { path: 'activeRiders', Component: ActiveRider}   , // ✅ Added Active Riders
      {path:'trackParcel',Component:TrackParcel},
    ]
  }
]);