import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import UserList from "./pages/users/UserList";
import UserForm from "./pages/users/UserForm";
import ProviderList from "./pages/providers/ProviderList";
import ProviderForm from "./pages/providers/ProviderForm";
import SaleList from "./pages/sales/SaleList";
import SaleForm from "./pages/sales/SaleForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/productos" element={<ProductList />} />
          <Route path="/productos/nuevo" element={<ProductForm />} />
          <Route path="/productos/editar/:id" element={<ProductForm />} />

          <Route path="/usuarios" element={<UserList />} />
          <Route path="/usuarios/nuevo" element={<UserForm />} />
          <Route path="/usuarios/editar/:id" element={<UserForm />} />

          <Route path="/proveedores" element={<ProviderList />} />
          <Route path="/proveedores/nuevo" element={<ProviderForm />} />
          <Route path="/proveedores/editar/:id" element={<ProviderForm />} />

          <Route path="/ventas" element={<SaleList />} />
          <Route path="/ventas/nueva" element={<SaleForm />} />
          <Route path="/ventas/editar/:id" element={<SaleForm />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}