import { useEffect, useState } from "react";
import { obtenerBacklogs } from "../api/backlogApi";

function BacklogPage() {
  const [backlog, setBacklog] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerBacklogs = async () => {
      try {
        const respuesta = await fetch("http://localhost:3000/backlogs");
        const datos = await respuesta.json();
        setBacklog(datos);
      } catch (error) {
        console.error("Error al obtener backlog:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerBacklogs();
  }, []);

  if (cargando) return <p>Cargando backlog...</p>;

  if (backlog.length === 0) return <p>No hay tareas en backlog.</p>;

  return (
    <div>
      <h2>Backlogs</h2>
      {backlog.map((b) => (
        <div key={b._id} style={{ marginBottom: "1rem" }}>
          <h3>{b.nombre}</h3>
          {b.listaTareas.length === 0 ? (
            <p>No hay tareas en este backlog.</p>
          ) : (
            <ul>
              {b.listaTareas.map((tarea) => (
                <li key={tarea._id}>
                  {tarea.titulo} - {tarea.estado}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default BacklogPage;
