import React from 'react';
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", icon: "bi-speedometer2", label: "Dashboard" },
  { to: "/productos", icon: "bi-box-seam", label: "Productos" },
  { to: "/usuarios", icon: "bi-people", label: "Usuarios" },
  { to: "/proveedores", icon: "bi-truck", label: "Proveedores" },
  { to: "/ventas", icon: "bi-receipt", label: "Ventas" },
];

export default function Sidebar() {
  return (
    <aside className="col-lg-2 sidebar p-0">
      <div className="p-3">
        <div className="text-uppercase text-muted small fw-bold mb-2">Menú</div>
        <nav className="nav flex-column gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `nav-link rounded ${isActive ? "active" : ""}`
              }
            >
              <i className={`bi ${link.icon} me-2`}></i>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}