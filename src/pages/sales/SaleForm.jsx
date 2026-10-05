import React from 'react';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { salesAPI, usersAPI, productsAPI } from "../../services/api";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";
import PageHeader from "../../components/PageHeader";

function list(data) { return Array.isArray(data) ? data : data?.data || []; }
function unwrap(data) { return data?.data ?? data; }

export default function SaleForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ userId: "", productId: "", quantity: 1, total: "" });
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [ur, pr] = await Promise.all([usersAPI.getAll(), productsAPI.getAll()]);
        setUsers(list(ur.data));
        setProducts(list(pr.data));
        if (editing) {
          const r = await salesAPI.getById(id);
          const s = unwrap(r.data);
          // Si la venta viene con detalles, los mapeamos al formulario
          const firstDetail = s.details?.[0] || {};
          setForm({
            userId: s.userId ?? s.user_id ?? s.UserId ?? "",
            productId: firstDetail.productId ?? s.productId ?? s.product_id ?? "",
            quantity: firstDetail.quantity ?? s.quantity ?? 1,
            total: s.total ?? "",
          });
        }
      } catch (err) { setError(err.response?.data?.message || "No se pudo cargar la información."); }
      finally { setLoading(false); }
    };
    load();
  }, [id, editing]);

  const change = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    if (e.target.name === "productId") {
      const product = products.find((p) => String(p.id) === String(e.target.value));
      if (product?.price != null) next.total = Number(product.price) * Number(form.quantity || 1);
    }
    if (e.target.name === "quantity") {
      const product = products.find((p) => String(p.id) === String(form.productId));
      if (product?.price != null) next.total = Number(product.price) * Number(e.target.value || 0);
    }
    setForm(next);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true); setError("");
      
      // Estructura requerida por el backend con 'details' en forma de arreglo
      const data = {
        userId: Number(form.userId),
        details: [
          {
            productId: Number(form.productId),
            quantity: Number(form.quantity)
          }
        ],
        ...(form.total !== "" ? { total: Number(form.total) } : {}),
      };

      if (editing) await salesAPI.update(id, data); else await salesAPI.create(data);
      navigate("/ventas");
    } catch (err) { setError(err.response?.data?.message || "No se pudo guardar la venta. Revisa los campos y el backend."); }
    finally { setSaving(false); }
  };

  if (loading) return <Loading />;

  return <>
    <PageHeader title={editing ? "Editar venta" : "Nueva venta"} subtitle="Registra una venta desde el frontend." />
    <AlertMessage message={error} onClose={() => setError("")} />
    <div className="card border-0 shadow-sm"><div className="card-body p-4"><form onSubmit={submit}>
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label">Usuario</label><select className="form-select" name="userId" value={form.userId} onChange={change} required>
          <option value="">Seleccionar usuario</option>{users.map((u) => <option key={u.id} value={u.id}>{u.name ?? u.nombre ?? u.email}</option>)}</select></div>
        <div className="col-md-6"><label className="form-label">Producto</label><select className="form-select" name="productId" value={form.productId} onChange={change} required>
          <option value="">Seleccionar producto</option>{products.map((p) => <option key={p.id} value={p.id}>{p.name ?? p.nombre} {p.stock != null ? `(stock: ${p.stock})` : ""}</option>)}</select></div>
        <div className="col-md-4"><label className="form-label">Cantidad</label><input type="number" min="1" className="form-control" name="quantity" value={form.quantity} onChange={change} required /></div>
        <div className="col-md-4"><label className="form-label">Total</label><input type="number" min="0" step="0.01" className="form-control" name="total" value={form.total} onChange={change} /></div>
      </div>
      <div className="mt-4 d-flex gap-2"><button className="btn btn-primary" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button><Link to="/ventas" className="btn btn-secondary">Cancelar</Link></div>
    </form></div></div>
  </>;
}