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

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
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
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ]
    },
    {
      element: (
        <ProtectedRoute>
          <Layout />
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
          <Layout />
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
