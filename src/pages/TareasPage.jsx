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
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?"
    );
    if (!confirmacion) return;
    try {
      await eliminarTarea(id);
      setTareas(tareas.filter((tarea) => tarea._id !== id));
      cargarTareas();
    } catch (error) {
      if (
        error.message.includes("asignada a un sprint") ||
        error.message.includes("no puede eliminarse")
      ) {
        alert(
          "La tarea no puede eliminarse porque se encuentra actualmente en un sprint"
        );
      } else {
        alert("Error al eliminar la tarea. Intenta nuevamente.");
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
