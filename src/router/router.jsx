import { createBrowserRouter } from "react-router";
import rootLayout from "../layout/rootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import privateRoutes from "../routes/privateRoutes";
import CoveragePage from "../pages/coverage/CoveragePage";
import SendParcel from "../pages/sendParcel/SendParcel";

 export const router = createBrowserRouter([
  {
    path: "/",
   Component:rootLayout,
   children:[
{
  index:true,
  Component:Home,
},
{
  path:'/coverage',
  Component:CoveragePage,
},
{
  path:'/sendParcel',
  element:<privateRoutes><SendParcel></SendParcel></privateRoutes>
}
 ]
  },
  {
path:'/',
Component:AuthLayout,
children:[{
  path:'/login',
  Component:Login,

},
{
  path:'/register',
  Component:Register,
}
]
  },
]);