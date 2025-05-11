import { useEffect, useState } from "react";
import { obtenerTareas } from "../api/tareasApi";

function SprintFormulario({ onSubmit, initialData = {} }) {
  const [nombreSprint, setNombreSprint] = useState(
    initialData.nombreSprint || ""
  );
  const [fechaInicio, setFechaInicio] = useState(
    initialData.fechaInicio?.slice(0, 10) || ""
  );
  const [fechaFin, setFechaFin] = useState(
    initialData.fechaFin?.slice(0, 10) || ""
  );
  const [color, setColor] = useState(initialData.color || "#000000");
  const [listaTareas, setListaTareas] = useState(initialData.listaTareas || []);
  const [tareasDisponibles, setTareasDisponibles] = useState([]);

  useEffect(() => {
    async function cargarTareas() {
      try {
        const tareas = await obtenerTareas();
        setTareasDisponibles(tareas);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    }
    cargarTareas();
  }, []);

  const toggleTarea = (tarea) => {
    const yaEsta = listaTareas.find((t) => t._id === tarea._id);
    if (yaEsta) {
      setListaTareas(listaTareas.filter((t) => t._id !== tarea._id));
    } else {
      setListaTareas([...listaTareas, tarea]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombreSprint, fechaInicio, fechaFin, color, listaTareas });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre del Sprint:</label>
        <input
          type="text"
          value={nombreSprint}
          onChange={(e) => setNombreSprint(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="form-control form-control-color"
          title="Seleccionar color"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tareas:</label>
        <div className="form-check">
          {tareasDisponibles.map((tarea) => (
            <div className="form-check" key={tarea._id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`tarea-${tarea._id}`}
                checked={listaTareas.some((t) => t._id === tarea._id)}
                onChange={() => toggleTarea(tarea)}
              />
              <label
                className="form-check-label"
                htmlFor={`tarea-${tarea._id}`}
              >
                {tarea.titulo} - {tarea.estado}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Guardar Sprint
      </button>
    </form>
  );
}

export default SprintFormulario;
