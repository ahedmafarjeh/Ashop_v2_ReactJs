import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import SendCode from "./pages/sendCode/SendCode";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ProtectedRouter from "./ProtectedRouter";
import ProductDetails from "./pages/products/ProductDetails";


const router = new createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "cart",
        element:
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>

      },
      {
        path: "products/:id",
        element: <ProductDetails />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
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