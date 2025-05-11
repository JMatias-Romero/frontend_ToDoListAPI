import { useEffect, useState } from "react";
import { obtenerSprints, eliminarSprint } from "../api/sprintsApi";
import { Link } from "react-router-dom";

function SprintPage() {
  const [sprints, setSprints] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarSprints() {
      try {
        const datos = await obtenerSprints();
        setSprints(datos);
      } catch (error) {
        console.error("Error al cargar sprints:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarSprints();
  }, []);

  const handleEliminarSprint = async (id) => {
    try {
      await eliminarSprint(id);
      setSprints(sprints.filter((sprint) => sprint._id !== id));
    } catch (error) {
      console.error("Error al eliminar el sprint:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Sprints</h2>
        <Link to="/crear-sprint" className="btn btn-success">
          Crear Nuevo Sprint
        </Link>
      </div>

      {cargando ? (
        <p>Cargando sprints...</p>
      ) : sprints.length === 0 ? (
        <p>No hay sprints disponibles.</p>
      ) : (
        sprints.map((sprint) => (
          <div key={sprint._id} className="card p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">{sprint.nombreSprint}</h3>
              <div>
                <Link
                  to={`/editar-sprint/${sprint._id}`}
                  className="btn btn-sm btn-secondary me-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleEliminarSprint(sprint._id)}
                  className="btn btn-sm btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <p className="mt-2">
              <strong>Inicio:</strong>{" "}
              {new Date(sprint.fechaInicio).toLocaleDateString("es-ES")}
              <br />
              <strong>Fin:</strong>{" "}
              {new Date(sprint.fechaFin).toLocaleDateString("es-ES")}
            </p>
            {sprint.tareas.length === 0 ? (
              <p className="mt-2">No hay tareas en este sprint.</p>
            ) : (
              <ul className="mt-2">
                {sprint.tareas.map((tarea) => (
                  <li key={tarea._id}>
                    {tarea.titulo} - {tarea.estado}
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

export default SprintPage;
