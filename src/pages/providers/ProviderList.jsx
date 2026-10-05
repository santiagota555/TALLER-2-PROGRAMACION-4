import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { providersAPI } from "../../services/api";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";
import PageHeader from "../../components/PageHeader";
import ConfirmModal from "../../components/ConfirmModal";

function getData(response) { return Array.isArray(response.data) ? response.data : response.data?.data || []; }

export default function ProviderList() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    try { setLoading(true); const r = await providersAPI.getAll(); setProviders(getData(r)); }
    catch (err) { setError(err.response?.data?.message || "No se pudieron cargar los proveedores."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const remove = async () => {
    try { await providersAPI.delete(deleteId); setDeleteId(null); await load(); }
    catch (err) { setError(err.response?.data?.message || "No se pudo eliminar el proveedor."); setDeleteId(null); }
  };

  return <>
    <PageHeader title="Proveedores" subtitle="Administra los proveedores del supermercado."
      action={<Link to="/proveedores/nuevo" className="btn btn-primary"><i className="bi bi-plus-lg me-1"></i> Nuevo proveedor</Link>} />
    <AlertMessage message={error} onClose={() => setError("")} />
    <div className="card border-0 shadow-sm"><div className="card-body">{loading ? <Loading /> :
      <div className="table-responsive"><table className="table table-hover align-middle">
        <thead className="table-light"><tr><th>ID</th><th>Nombre</th><th>Teléfono</th><th>Email</th><th>Acciones</th></tr></thead>
        <tbody>{providers.length === 0 ? <tr><td colSpan="5" className="text-center py-4 text-muted">No hay proveedores.</td></tr> :
          providers.map((p) => <tr key={p.id}><td>{p.id}</td><td>{p.name ?? p.nombre ?? "-"}</td><td>{p.phone ?? p.telefono ?? "-"}</td><td>{p.email ?? p.correo ?? "-"}</td>
            <td><Link to={`/proveedores/editar/${p.id}`} className="btn btn-sm btn-outline-primary me-2"><i className="bi bi-pencil"></i></Link>
            <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteId(p.id)}><i className="bi bi-trash"></i></button></td></tr>)}</tbody>
      </table></div>}</div></div>
    <ConfirmModal show={deleteId !== null} title="Eliminar proveedor" message="¿Seguro que deseas eliminar este proveedor?" onConfirm={remove} onCancel={() => setDeleteId(null)} />
  </>;
}