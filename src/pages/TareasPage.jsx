import { useEffect, useState } from "react";
import { obtenerTareas, crearTarea } from "../api/tareasApi";
import { Link } from "react-router-dom";
import TareaFormulario from "../components/TareaFormulario";

function TareasPage() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarTareas = async () => {
    const datos = await obtenerTareas();
    setTareas(datos);
    setCargando(false);
  };

  const handleCrearTarea = async (nuevaTarea) => {
    try {
      await crearTarea(nuevaTarea);
      cargarTareas();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  if (cargando) return <p>Cargando tareas...</p>;

  return (
    <div>
      <h2>Lista de Tareas</h2>

      {/* Formulario para crear tarea */}
      <TareaFormulario onSubmit={handleCrearTarea} />

      {/* Lista de tareas */}
      <ul>
        {tareas.map((t) => (
          <li key={t._id}>
            {t.titulo} - {t.estado}{" "}
            <Link to={`/editar-tarea/${t._id}`}>
              <button>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TareasPage;
