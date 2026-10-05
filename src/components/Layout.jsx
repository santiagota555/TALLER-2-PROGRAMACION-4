import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-lg-10 ms-auto px-4 py-4 main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}