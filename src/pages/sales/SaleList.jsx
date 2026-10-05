
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { salesAPI } from "../../services/api";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";
import PageHeader from "../../components/PageHeader";
import ConfirmModal from "../../components/ConfirmModal";

function getData(response) { return Array.isArray(response.data) ? response.data : response.data?.data || []; }

export default function SaleList() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    try { setLoading(true); const r = await salesAPI.getAll(); setSales(getData(r)); }
    catch (err) { setError(err.response?.data?.message || "No se pudieron cargar las ventas."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const remove = async () => {
    try { await salesAPI.delete(deleteId); setDeleteId(null); await load(); }
    catch (err) { setError(err.response?.data?.message || "No se pudo eliminar la venta."); setDeleteId(null); }
  };

  return <>
    <PageHeader title="Ventas" subtitle="Consulta y administra las ventas."
      action={<Link to="/ventas/nueva" className="btn btn-primary"><i className="bi bi-plus-lg me-1"></i> Nueva venta</Link>} />
    <AlertMessage message={error} onClose={() => setError("")} />
    <div className="card border-0 shadow-sm"><div className="card-body">{loading ? <Loading /> :
      <div className="table-responsive"><table className="table table-hover align-middle">
        <thead className="table-light"><tr><th>ID</th><th>Usuario</th><th>Total</th><th>Fecha</th><th>Acciones</th></tr></thead>
        <tbody>{sales.length === 0 ? <tr><td colSpan="5" className="text-center py-4 text-muted">No hay ventas.</td></tr> :
          sales.map((s) => <tr key={s.id}><td>{s.id}</td><td>{s.user?.name ?? s.User?.name ?? s.userId ?? s.user_id ?? "-"}</td>
            <td>{s.total != null ? `$ ${Number(s.total).toLocaleString()}` : "-"}</td>
            <td>{s.createdAt ? new Date(s.createdAt).toLocaleString() : s.date ?? "-"}</td>
            <td><Link to={`/ventas/editar/${s.id}`} className="btn btn-sm btn-outline-primary me-2"><i className="bi bi-pencil"></i></Link>
            <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteId(s.id)}><i className="bi bi-trash"></i></button></td></tr>)}</tbody>
      </table></div>}</div></div>
    <ConfirmModal show={deleteId !== null} title="Eliminar venta" message="¿Seguro que deseas eliminar esta venta?" onConfirm={remove} onCancel={() => setDeleteId(null)} />
  </>;
}