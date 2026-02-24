import { createBrowserRouter } from "react-router";
// Ensure imports are PascalCase to match Component usage
import RootLayout from "../layout/RootLayout"; 
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";

import CoveragePage from "../pages/coverage/CoveragePage";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashBoardLayout from "../layout/dashBoardLayout"; // Removed duplicate lowercase import
import MyParcels from "../pages/dashBoard/myParcels/MyParcels";
import PrivateRoutes from "../routes/privateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout, // Passing the reference
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
        // Note: Wrapped routes MUST use 'element' because they contain JSX logic
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
    // Wrapped routes MUST use 'element'
    element: (
      <PrivateRoutes>
        <DashBoardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: 'myParcels',
        Component: MyParcels, // Passing the reference
      },
    ]
  }
]);