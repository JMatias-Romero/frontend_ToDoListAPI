import { useEffect, useState } from "react";
import { obtenerSprints } from "../api/sprintsApi";
import { Link } from "react-router-dom";

import { eliminarSprint } from "../api/sprintsApi";
import { eliminarTareaDelSprint } from "../api/sprintsApi";

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

  //eliminar tareas en sprints
  const handleEliminarTarea = async (sprintId, tareaId) => {
    try {
      await eliminarTareaDelSprint(sprintId, tareaId);
      setSprints(
        sprints.map((sprint) =>
          sprint._id === sprintId
            ? {
                ...sprint,
                listaTareas: sprint.listaTareas.filter(
                  (tarea) => tarea._id !== tareaId
                ),
              }
            : sprint
        )
      );
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
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
            <p>Inicio: {new Date(sprint.fechaInicio).toLocaleDateString()}</p>
            <p>Fin: {new Date(sprint.fechaFin).toLocaleDateString()}</p>

            {/* Listar las tareas dentro del sprint */}
            <ul>
              {sprint.tareas.length > 0 ? (
                sprint.tareas.map((tarea) => (
                  <li key={tarea._id}>
                    {tarea.titulo} - {tarea.estado}
                    <button onClick={() => handleEliminarTarea(tarea._id)}>
                      Eliminar Tarea
                    </button>
                  </li>
                ))
              ) : (
                <li>No hay tareas en este sprint.</li>
              )}
            </ul>
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
