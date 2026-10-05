import React from 'react';
export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary sticky-top shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">
          <i className="bi bi-cart3 me-2"></i>
          MarketSoft
        </a>
        <span className="text-white small">Sistema de supermercado</span>
      </div>
    </nav>
  );
}