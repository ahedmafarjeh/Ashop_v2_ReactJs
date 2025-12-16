import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";


const router = new createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path:"home",
        element: <Home />      
      }
    ]
  },
  {
    path: "/auth",
    element:<AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
]);
export default router;