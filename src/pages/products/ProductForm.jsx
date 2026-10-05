import React from 'react';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productsAPI, providersAPI } from "../../services/api";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";
import PageHeader from "../../components/PageHeader";

function unwrap(data) { return data?.data ?? data; }
function list(data) { return Array.isArray(data) ? data : data?.data || []; }

export default function ProductForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "", providerId: "" });
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const providerResponse = await providersAPI.getAll();
        setProviders(list(providerResponse.data));
        if (editing) {
          const response = await productsAPI.getById(id);
          const p = unwrap(response.data);
          setForm({
            name: p.name ?? p.nombre ?? "",
            price: p.price ?? p.precio ?? "",
            stock: p.stock ?? "",
            providerId: p.providerId ?? p.provider_id ?? p.ProviderId ?? "",
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || "No se pudo cargar la información.");
      } finally { setLoading(false); }
    };
    load();
  }, [id, editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      
      const data = {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        ...(form.providerId ? { providerId: Number(form.providerId) } : {}),
      };

      // Si no estamos editando, nos aseguramos de no enviar ningún id por accidente
      if (!editing) {
        delete data.id;
      }

      if (editing) {
        await productsAPI.update(id, data);
      } else {
        await productsAPI.create(data);
      }
      navigate("/productos");
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo guardar el producto.");
    } finally { setSaving(false); }
  };

  if (loading) return <Loading />;

  return (
    <>
      <PageHeader title={editing ? "Editar producto" : "Nuevo producto"} subtitle="Completa los datos del producto." />
      <AlertMessage message={error} onClose={() => setError("")} />
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={submit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input className="form-control" name="name" value={form.name} onChange={change} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Precio</label>
                <input type="number" min="0" step="0.01" className="form-control" name="price" value={form.price} onChange={change} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Stock</label>
                <input type="number" min="0" className="form-control" name="stock" value={form.stock} onChange={change} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Proveedor</label>
                <select className="form-select" name="providerId" value={form.providerId} onChange={change}>
                  <option value="">Seleccionar proveedor</option>
                  {providers.map((p) => <option key={p.id} value={p.id}>{p.name ?? p.nombre}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4 d-flex gap-2">
              <button className="btn btn-primary" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
              <Link to="/productos" className="btn btn-secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}