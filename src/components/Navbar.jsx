import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { logout } from "../app/userSlice";
import parfumeLogo from "../../public/parfumelogoo.jpg";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOut = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon!");
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-4 shadow-2xl bg-white text-gray-300 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              className="w-14 h-14 rounded-sm object-cover"
              src={parfumeLogo}
              alt="Logo"
            />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>

          <ul className={`hidden lg:flex space-x-8 relative`}>
            {["/", "/about", "/products", "/checkout", "/contact"].map(
              (path) => (
                <li key={path} className="relative">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `text-black text-lg font-semibold relative ${
                        isActive ? "text-purple-900" : ""
                      }`
                    }
                    end>
                    {path === "/"
                      ? "Home"
                      : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                    <span
                      className={`absolute left-0 bottom-[-5px] w-full h-[2px] bg-purple-800 transition-transform ${
                        location.pathname === path ? "scale-x-100" : "scale-x-0"
                      } transform origin-left`}></span>
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <div
            className={`lg:hidden absolute top-16 left-0 w-full bg-gray-800 ${
              isMobileMenuOpen ? "block" : "hidden"
            } transition-transform duration-300`}>
            <ul className="space-y-4 p-4">
              {["/", "/about", "/products", "/checkout", "/contact"].map(
                (path) => (
                  <li key={path} className="relative">
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `text-black text-lg font-semibold relative ${
                          isActive ? "text-gray-300" : ""
                        }`
                      }
                      end>
                      {path === "/"
                        ? "Home"
                        : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                      <span
                        className={`absolute left-0 bottom-[-5px] w-full h-[2px] bg-gray-300 transition-transform ${
                          location.pathname === path
                            ? "scale-x-100"
                            : "scale-x-0"
                        } transform origin-left`}></span>
                    </NavLink>
                  </li>
                )
              )}
              {user && (
                <li className="flex items-center space-x-2">
                  <img
                    className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-md"
                    src={
                      user.photoURL ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`
                    }
                    alt="user avatar"
                  />
                  <span className="text-black font-medium text-base">
                    {user.displayName}
                  </span>
                </li>
              )}
              {user && (
                <li>
                  <button
                    onClick={handleOut}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors transform hover:scale-105 w-full">
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>

          {user && (
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  className="w-12 h-12 rounded-full border-[3px] border-purple-900 shadow-md"
                  src={
                    user.photoURL ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`
                  }
                  alt="user avatar"
                />
                <span className="text-black capitalize font-medium text-base">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={handleOut}
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors transform hover:scale-105">
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="mt-16"></div>
    </>
  );
};

export default Navbar;
