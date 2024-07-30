// layouts/MainLayout.js
import { Navbar } from "../components";
import { Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const location = useLocation();
  const showNavbar = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />} 
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
