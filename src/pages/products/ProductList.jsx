import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../../services/api";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";
import PageHeader from "../../components/PageHeader";
import ConfirmModal from "../../components/ConfirmModal";

function getData(response) {
  return Array.isArray(response.data) ? response.data : response.data?.data || [];
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await productsAPI.getAll();
      setProducts(getData(response));
    } catch (err) {
      setError(err.response?.data?.message || "No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const deleteProduct = async () => {
    try {
      await productsAPI.delete(deleteId);
      setDeleteId(null);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo eliminar el producto.");
      setDeleteId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Productos"
        subtitle="Gestiona el inventario del supermercado."
        action={
          <Link to="/productos/nuevo" className="btn btn-primary">
            <i className="bi bi-plus-lg me-1"></i> Nuevo producto
          </Link>
        }
      />
      <AlertMessage message={error} onClose={() => setError("")} />

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {loading ? <Loading /> : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-4 text-muted">No hay productos.</td></tr>
                  ) : products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td className="fw-semibold">{p.name ?? p.nombre ?? "-"}</td>
                      <td>{p.price != null ? `$ ${Number(p.price).toLocaleString()}` : "-"}</td>
                      <td>{p.stock ?? "-"}</td>
                      <td>
                        <Link to={`/productos/editar/${p.id}`} className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteId(p.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        show={deleteId !== null}
        title="Eliminar producto"
        message="¿Seguro que deseas eliminar este producto?"
        onConfirm={deleteProduct}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}