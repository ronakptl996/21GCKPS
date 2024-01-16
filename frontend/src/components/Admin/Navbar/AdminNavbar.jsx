import React from "react";
import Logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <section className="admin-navbar">
      <div className="admin-navbar-logo">
        <img src={Logo} srcset="" />
      </div>
      <div className="admin-navbar-items">
        <ul>
          <li>
            <NavLink to="/admin">Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin">We</NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AdminNavbar;
