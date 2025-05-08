import { useEffect, useState } from "react";
import { obtenerTareas, eliminarTarea } from "../api/tareasApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function TareasPage() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarTareas = async () => {
    const datos = await obtenerTareas();
    setTareas(datos);
    setCargando(false);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const MySwal = withReactContent(Swal);
  const handleEliminarTarea = async (id) => {
    const result = await MySwal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await eliminarTarea(id);
        toast.success("Tarea eliminada");
        setTareas(tareas.filter((tarea) => tarea._id !== id));
        cargarTareas();
      } catch (error) {
        if (
          error.message.includes("asignada a un sprint") ||
          error.message.includes("no puede eliminarse")
        ) {
          toast.error("La tarea está en un sprint, no puede eliminarse");
        } else {
          toast.error("Ocurrió un error al eliminar la tarea");
          console.error(error);
        }
      }
    }
  };

  function obtenerClaseEstado(estado) {
    switch (estado) {
      case "pendiente":
        return "badge bg-warning text-dark";
      case "en progreso":
        return "badge bg-info text-dark";
      case "completado":
        return "badge bg-success";
      default:
        return "badge bg-secondary";
    }
  }

  if (cargando) return <p className="text-center mt-4">Cargando tareas...</p>;
  if (tareas.length === 0)
    return <p className="text-center mt-4">No hay tareas disponibles.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Tareas</h2>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/crear-tarea" className="btn btn-success">
          Crear Tarea
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Tarea</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((t) => (
              <tr key={t._id}>
                <td>{t.titulo}</td>
                <td>
                  <span className={`badge ${obtenerClaseEstado(t.estado)}`}>
                    {t.estado}
                  </span>
                </td>
                <td className="text-center">
                  <Link
                    to={`/editar-tarea/${t._id}`}
                    className="btn btn-outline-primary btn-sm me-2"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      console.log(t._id);
                      handleEliminarTarea(t._id);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TareasPage;
