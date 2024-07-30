import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home, Login, Register } from "./pages";
import MainLayout from "./layouts/MainLayout";
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { isAuthChange, login } from "./app/userSlice";
import About from "./pages/About";
import Products from "./pages/Product";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const { user, isAuthReady } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "/about", element: <About /> },
        { path: "/products", element: <Products /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/contact", element: <Contact /> },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.displayName || user?.photoURL) {
        dispatch(login(user));
      }
      dispatch(isAuthChange());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return isAuthReady ? <RouterProvider router={router} /> : null;
}

export default App;
