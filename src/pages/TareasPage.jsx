import { useEffect, useState } from "react";
import { obtenerTareas, crearTarea, eliminarTarea } from "../api/tareasApi";
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

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleCrearTarea = async (nuevaTarea) => {
    try {
      await crearTarea(nuevaTarea);
      cargarTareas();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const handleEliminarTarea = async (id) => {
    try {
      await eliminarTarea(id);
      setTareas(tareas.filter((tarea) => tarea._id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  if (cargando) return <p className="text-center mt-4">Cargando tareas...</p>;
  if (tareas.length === 0)
    return <p className="text-center mt-4">No hay tareas disponibles.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Tareas</h2>

      {/* Formulario para crear tarea */}
      <TareaFormulario onSubmit={handleCrearTarea} />

      {/* Lista de tareas */}
      <ul className="list-group mt-4">
        {tareas.map((t) => (
          <li
            key={t._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {t.titulo} - {t.estado}{" "}
            <Link
              to={`/editar-tarea/${t._id}`}
              className="btn btn-sm btn-primary me-2"
            >
              <button>Editar</button>
            </Link>{" "}
            <button onClick={() => handleEliminarTarea(t._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TareasPage;
