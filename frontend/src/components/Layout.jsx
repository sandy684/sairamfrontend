import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css'; // optional: you can add styling here

export default function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      {/* 📱 Mobile Topbar */}
      <div className="d-md-none d-flex justify-content-between align-items-center p-2 bg-dark text-white">
        <button className="btn btn-light" onClick={toggleSidebar}>☰ Menu</button>
        <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-dark text-white d-flex flex-column justify-content-between sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{ minHeight: '100vh', width: '250px' }}
      >
        {/* Top */}
        <div>
          <h4 className="mt-3 ps-2">Admin Panel</h4>
          <hr />
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-white" onClick={() => setSidebarOpen(false)}>
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-vegetable" className="nav-link text-white" onClick={() => setSidebarOpen(false)}>
                Add Vegetable
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/manage-vegetables" className="nav-link text-white" onClick={() => setSidebarOpen(false)}>
                Manage Vegetables
              </Link>
            </li>
            <li className="nav-item">
  <Link to="/admin/add-supplier" className="nav-link text-white" onClick={() => setSidebarOpen(false)}>Add Supplier</Link>
</li>
<li>
   <Link to="/admin/view-suppliers"className="nav-link text-white" onClick={() => setSidebarOpen(false)}>View Suppliers</Link>
</li>
          </ul>
        </div>

        {/* Bottom Logout */}
        <div className="p-3">
          <button className="btn btn-outline-light w-100" onClick={logout}>🚪 Logout</button>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-4 flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}
