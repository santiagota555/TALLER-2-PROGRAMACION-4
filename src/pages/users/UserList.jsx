import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // 1. Agregamos la importación de Axios
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";
import PageHeader from "../../components/PageHeader";
import ConfirmModal from "../../components/ConfirmModal";

// Ya no necesitamos importar usersAPI desde "../../services/api"

function getData(response) { 
  return Array.isArray(response.data) ? response.data : response.data?.data || []; 
}

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      // 2. Aquí hacemos la petición GET con Axios
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`);
      setUsers(getData(response));
    } catch (err) { 
      setError(err.response?.data?.message || "No se pudieron cargar los usuarios."); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async () => {
    try { 
      // 3. Aquí hacemos la petición DELETE con Axios
      await axios.delete(`${import.meta.env.VITE_API_URL}/usuarios/${deleteId}`); 
      setDeleteId(null); 
      await load(); 
    } catch (err) { 
      setError(err.response?.data?.message || "No se pudo eliminar el usuario."); 
      setDeleteId(null); 
    }
  };

  return (
    <>
      <PageHeader title="Usuarios" subtitle="Administra los usuarios del sistema."
        action={<Link to="/usuarios/nuevo" className="btn btn-primary"><i className="bi bi-plus-lg me-1"></i> Nuevo usuario</Link>} />
      <AlertMessage message={error} onClose={() => setError("")} />
      <div className="card border-0 shadow-sm"><div className="card-body">
        {loading ? <Loading /> : <div className="table-responsive"><table className="table table-hover align-middle">
          <thead className="table-light"><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Acciones</th></tr></thead>
          <tbody>{users.length === 0 ? <tr><td colSpan="4" className="text-center py-4 text-muted">No hay usuarios.</td></tr> :
            users.map((u) => <tr key={u.id}><td>{u.id}</td><td>{u.name ?? u.nombre ?? "-"}</td><td>{u.email ?? u.correo ?? "-"}</td>
              <td><Link to={`/usuarios/editar/${u.id}`} className="btn btn-sm btn-outline-primary me-2"><i className="bi bi-pencil"></i></Link>
              <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteId(u.id)}><i className="bi bi-trash"></i></button></td></tr>)}</tbody>
        </table></div>}
      </div></div>
      <ConfirmModal show={deleteId !== null} title="Eliminar usuario" message="¿Seguro que deseas eliminar este usuario?" onConfirm={remove} onCancel={() => setDeleteId(null)} />
    </>
  );
}