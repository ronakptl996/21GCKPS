import React from "react";
import "./AdminSidebar.css";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <section className="admin-sidebar-section">
      <div className="admin-sidebar-inner">
        <ul>
          <li>
            <NavLink to="/admin" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/committee">Add Committee Member</NavLink>
          </li>
          <li>
            <NavLink to="/admin/donation">Add Donation</NavLink>
          </li>
          <li>
            <NavLink to="/admin/festival">Add Festival</NavLink>
          </li>
          <li>
            <NavLink to="/admin/job-posting">Job Posting</NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AdminSidebar;
