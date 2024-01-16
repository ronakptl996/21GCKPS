import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/Admin/Navbar/AdminNavbar";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <section className="admin-wrapper">
        <AdminNavbar />
        <AdminSidebar />
        <section className="admin-content">
          <Outlet />
        </section>
      </section>
    </>
  );
};

export default AdminLayout;
