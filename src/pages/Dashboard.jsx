import React from 'react';
import { Link } from "react-router-dom";

const modules = [
  { title: "Productos", icon: "bi-box-seam", to: "/productos", text: "Gestiona el inventario de productos." },
  { title: "Usuarios", icon: "bi-people", to: "/usuarios", text: "Administra los usuarios del sistema." },
  { title: "Proveedores", icon: "bi-truck", to: "/proveedores", text: "Gestiona los proveedores." },
  { title: "Ventas", icon: "bi-receipt", to: "/ventas", text: "Registra y consulta las ventas." },
];

export default function Dashboard() {
  return (
    <>
      <div className="p-4 p-md-5 bg-white rounded-4 shadow-sm mb-4">
        <span className="badge text-bg-primary mb-2">SPA React</span>
        <h1 className="display-6 fw-bold">Bienvenido a MarketSoft</h1>
        <p className="lead text-muted mb-0">
          Panel de administración del supermercado conectado a la API REST.
        </p>
      </div>

      <h2 className="h4 fw-bold mb-3">Módulos</h2>
      <div className="row g-4">
        {modules.map((module) => (
          <div className="col-md-6 col-xl-3" key={module.title}>
            <div className="card h-100 border-0 shadow-sm module-card">
              <div className="card-body">
                <i className={`bi ${module.icon} fs-1 text-primary`}></i>
                <h3 className="h5 fw-bold mt-3">{module.title}</h3>
                <p className="text-muted">{module.text}</p>
                <Link className="btn btn-outline-primary" to={module.to}>
                  Administrar <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}