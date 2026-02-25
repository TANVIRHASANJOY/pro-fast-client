import { createBrowserRouter } from "react-router";
// Ensure imports are PascalCase to match Component usage
import RootLayout from "../layout/RootLayout"; 
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";

import CoveragePage from "../pages/coverage/CoveragePage";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashBoardLayout from "../layout/dashBoardLayout"; 
import MyParcels from "../pages/dashBoard/myParcels/MyParcels";
import PrivateRoutes from "../routes/privateRoutes";
import Payments from "../pages/dashBoard/Payment/Payments";
import PaymentHistory from '../pages/dashBoard/paymentHistory/PaymentHistory'; // Added this import

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout, 
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'coverage',
        Component: CoveragePage,
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
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      }
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
      {
        path: 'myParcels',
        Component: MyParcels, 
      },
      {
        path: 'payment/:id',
        Component: Payments,
      },
      {
        path: 'paymentHistory', // Added payment history route
        Component: PaymentHistory,
      }
    ]
  }
]);