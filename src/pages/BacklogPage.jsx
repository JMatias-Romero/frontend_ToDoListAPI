import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerBacklogs, eliminarBacklog } from "../api/backlogApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function BacklogPage() {
  const [backlogs, setBacklogs] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await obtenerBacklogs();
        setBacklogs(datos);
      } catch (error) {
        console.error("Error al obtener backlogs:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar backlog?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await eliminarBacklog(id);
        setBacklogs((prev) => prev.filter((b) => b._id !== id));
        toast.success("Backlog eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar backlog:", error);
        Swal.fire("Error", "No se pudo eliminar el backlog.", "error");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Backlogs</h2>
        <Link to="/backlogs/crear" className="btn btn-success">
          Crear Backlog
        </Link>
      </div>

      {cargando ? (
        <p className="text-center">Cargando backlog...</p>
      ) : backlogs.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay backlogs disponibles.
        </div>
      ) : (
        backlogs.map((b) => (
          <div
            key={b._id}
            className="card shadow-sm p-3 mb-3"
            style={{ borderRadius: "12px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0 fw-semibold">{b.nombre}</h5>
              <div className="btn-group">
                <Link
                  to={`/backlogs/${b._id}/editar`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleEliminar(b._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>

            {b.listaTareas.length === 0 ? (
              <p className="text-muted">No hay tareas en este backlog.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {b.listaTareas.map((tarea) => (
                  <li
                    key={tarea._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{tarea.titulo}</span>
                    <span className="badge bg-secondary">{tarea.estado}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default BacklogPage;
