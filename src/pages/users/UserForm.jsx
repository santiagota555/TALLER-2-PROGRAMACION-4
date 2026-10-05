import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usersAPI } from "../../services/api";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";
import PageHeader from "../../components/PageHeader";

export default function UserForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) return;
    usersAPI.getById(id).then((r) => {
      const u = r.data?.data ?? r.data;
      setForm({ name: u.name ?? u.nombre ?? "", email: u.email ?? u.correo ?? "", password: "" });
    }).catch((err) => setError(err.response?.data?.message || "No se pudo cargar el usuario."))
      .finally(() => setLoading(false));
  }, [id, editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true); setError("");
      const data = { name: form.name, email: form.email };
      if (form.password) data.password = form.password;
      if (editing) await usersAPI.update(id, data); else await usersAPI.create({ ...data, password: form.password });
      navigate("/usuarios");
    } catch (err) { setError(err.response?.data?.message || "No se pudo guardar el usuario."); }
    finally { setSaving(false); }
  };

  if (loading) return <Loading />;

  return <>
    <PageHeader title={editing ? "Editar usuario" : "Nuevo usuario"} subtitle="Completa los datos del usuario." />
    <AlertMessage message={error} onClose={() => setError("")} />
    <div className="card border-0 shadow-sm"><div className="card-body p-4"><form onSubmit={submit}>
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label">Nombre</label><input className="form-control" name="name" value={form.name} onChange={change} required /></div>
        <div className="col-md-6"><label className="form-label">Correo electrónico</label><input type="email" className="form-control" name="email" value={form.email} onChange={change} required /></div>
        <div className="col-md-6"><label className="form-label">{editing ? "Nueva contraseña (opcional)" : "Contraseña"}</label><input type="password" className="form-control" name="password" value={form.password} onChange={change} required={!editing} /></div>
      </div>
      <div className="mt-4 d-flex gap-2"><button className="btn btn-primary" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button><Link to="/usuarios" className="btn btn-secondary">Cancelar</Link></div>
    </form></div></div>
  </>;
}