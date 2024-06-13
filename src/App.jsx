import { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './style.scss'

import { AuthContext } from "./contexts/AuthenticationContext";
import { DarkModeContext } from "./contexts/ThemeContext";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";


function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const ClientLayout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
          <Outlet />
        <Footer />
      </div>
    );
  }



  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }


  const UnProtectedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />
    }
    return children
  }

  const router = createBrowserRouter([
    {
      element: <ClientLayout/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/category-slug/product-slug",
          element: <Product />,
        },
      ]
    },
    {
      element: (
        <ProtectedRoute>
          <ClientLayout />
        </ProtectedRoute>
      ),
      children: [

        {
          path: "/account",
          element: <div>My Account</div>,
        },
      ]
    },
    {
      element: (
        <UnProtectedRoute>
          <ClientLayout />
        </UnProtectedRoute>
      ),
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ]
    },
    
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
