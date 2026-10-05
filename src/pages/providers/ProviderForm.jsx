import React from 'react';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { providersAPI } from "../../services/api";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";
import PageHeader from "../../components/PageHeader";

export default function ProviderForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) return;
    providersAPI.getById(id).then((r) => {
      const p = r.data?.data ?? r.data;
      setForm({
        name: p.name ?? p.nombre ?? "",
        phone: p.phone ?? p.telefono ?? "",
        email: p.email ?? p.correo ?? "",
        address: p.address ?? p.direccion ?? "",
      });
    }).catch((err) => setError(err.response?.data?.message || "No se pudo cargar el proveedor."))
      .finally(() => setLoading(false));
  }, [id, editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true); setError("");
      if (editing) await providersAPI.update(id, form); else await providersAPI.create(form);
      navigate("/proveedores");
    } catch (err) { setError(err.response?.data?.message || "No se pudo guardar el proveedor."); }
    finally { setSaving(false); }
  };

  if (loading) return <Loading />;

  return <>
    <PageHeader title={editing ? "Editar proveedor" : "Nuevo proveedor"} subtitle="Completa los datos del proveedor." />
    <AlertMessage message={error} onClose={() => setError("")} />
    <div className="card border-0 shadow-sm"><div className="card-body p-4"><form onSubmit={submit}>
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label">Nombre</label><input className="form-control" name="name" value={form.name} onChange={change} required /></div>
        <div className="col-md-6"><label className="form-label">Teléfono</label><input className="form-control" name="phone" value={form.phone} onChange={change} /></div>
        <div className="col-md-6"><label className="form-label">Correo</label><input type="email" className="form-control" name="email" value={form.email} onChange={change} /></div>
        <div className="col-md-6"><label className="form-label">Dirección</label><input className="form-control" name="address" value={form.address} onChange={change} /></div>
      </div>
      <div className="mt-4 d-flex gap-2"><button className="btn btn-primary" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button><Link to="/proveedores" className="btn btn-secondary">Cancelar</Link></div>
    </form></div></div>
  </>;
}