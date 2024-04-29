import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Navbar />
      <section className="main">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default Layout;
