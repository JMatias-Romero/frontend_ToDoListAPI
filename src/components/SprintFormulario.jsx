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
  const [color, setColor] = useState(initialData.color || "");
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
      <div>
        <label>Nombre del Sprint:</label>
        <input
          type="text"
          value={nombreSprint}
          onChange={(e) => setNombreSprint(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Fecha de Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Fecha de Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div>
        <label>Tareas:</label>
        <ul>
          {tareasDisponibles.map((tarea) => (
            <li key={tarea._id}>
              <label>
                <input
                  type="checkbox"
                  checked={listaTareas.some((t) => t._id === tarea._id)}
                  onChange={() => toggleTarea(tarea)}
                />
                {tarea.titulo} - {tarea.estado}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit">Guardar Sprint</button>
    </form>
  );
}

export default SprintFormulario;
