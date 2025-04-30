import { useEffect, useState } from "react";
import { obtenerSprints } from "../api/sprintsApi";
import { Link } from "react-router-dom";

import { eliminarSprint } from "../api/sprintsApi";

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

  //eliminar sprints
  const handleEliminarSprint = async (id) => {
    try {
      await eliminarSprint(id); // Llamada a la API para eliminar el sprint
      setSprints(sprints.filter((sprint) => sprint._id !== id)); // Actualizar la lista local
    } catch (error) {
      console.error("Error al eliminar el sprint:", error);
    }
  };

  if (cargando) return <p>Cargando sprints...</p>;

  if (sprints.length === 0) return <p>No hay sprints disponibles.</p>;

  return (
    <div>
      <h2>Lista de Sprints</h2>
      <Link to="/crear-sprint">Crear Nuevo Sprint</Link>
      <ul>
        {sprints.map((sprint) => (
          <li key={sprint._id}>
            <h3>{sprint.nombreSprint}</h3>
            <p>
              Inicio: {new Date(sprint.fechaInicio).toLocaleDateString("es-ES")}
            </p>
            <p>Fin:{new Date(sprint.fechaFin).toLocaleDateString("es-ES")}</p>

            {/* Listar las tareas dentro del sprint */}
            <ul>
              {sprint.tareas.length > 0 ? (
                sprint.tareas.map((tarea) => (
                  <li key={tarea._id}>
                    {tarea.titulo} - {tarea.estado}
                  </li>
                ))
              ) : (
                <li>No hay tareas en este sprint.</li>
              )}
            </ul>
            <Link to={`/editar-sprint/${sprint._id}`}>Editar</Link>
            <button onClick={() => handleEliminarSprint(sprint._id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SprintPage;
