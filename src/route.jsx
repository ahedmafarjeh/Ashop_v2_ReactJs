import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import SendCode from "./pages/sendCode/SendCode";
import ResetPassword from "./pages/resetPassword/ResetPassword";


const router = new createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path:"home",
        element: <Home />      
      },
      {
        path:"cart",
        element: <Cart />
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
      },
      {
        path: "send-code",
        element: <SendCode />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      }
    ]
  }
]);
export default router;