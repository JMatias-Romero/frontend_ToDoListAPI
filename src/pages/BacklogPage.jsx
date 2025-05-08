import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerBacklogs } from "../api/backlogApi";

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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Backlogs</h2>
        <Link to="/backlogs/crear" className="btn btn-success">
          Crear Backlog
        </Link>
      </div>

      {cargando ? (
        <p>Cargando backlog...</p>
      ) : backlogs.length === 0 ? (
        <p>No hay backlogs disponibles.</p>
      ) : (
        backlogs.map((b) => (
          <div key={b._id} className="card p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">{b.nombre}</h3>
              <Link
                to={`/backlogs/${b._id}/editar`}
                className="btn btn-sm btn-secondary"
              >
                Editar
              </Link>
            </div>
            {b.listaTareas.length === 0 ? (
              <p className="mt-2">No hay tareas en este backlog.</p>
            ) : (
              <ul className="mt-2">
                {b.listaTareas.map((tarea) => (
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

export default BacklogPage;
