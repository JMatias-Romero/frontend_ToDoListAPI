import { useState, useEffect } from "react";
import { obtenerTareas } from "../api/tareasApi"; // <-- este es tu API para traer tareas

function SprintFormulario({ sprintInicial = {}, onSubmit }) {
  const [sprint, setSprint] = useState({
    nombreSprint: sprintInicial.nombreSprint || "",
    fechaInicio: sprintInicial.fechaInicio?.slice(0, 10) || "",
    fechaFin: sprintInicial.fechaFin?.slice(0, 10) || "",
    listaTareas: sprintInicial.listaTareas || [],
    color: sprintInicial.color || "",
  });

  const [tareasDisponibles, setTareasDisponibles] = useState([]);

  useEffect(() => {
    async function cargarTareas() {
      try {
        const datos = await obtenerTareas();
        setTareasDisponibles(datos);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    }

    cargarTareas();
  }, []);

  const handleChange = (e) => {
    setSprint({ ...sprint, [e.target.name]: e.target.value });
  };

  const handleAgregarTarea = (idTarea) => {
    if (!sprint.listaTareas.includes(idTarea)) {
      setSprint({ ...sprint, listaTareas: [...sprint.listaTareas, idTarea] });
    }
  };

  const handleQuitarTarea = (idTarea) => {
    setSprint({
      ...sprint,
      listaTareas: sprint.listaTareas.filter((id) => id !== idTarea),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sprint);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombreSprint"
        value={sprint.nombreSprint}
        onChange={handleChange}
        placeholder="Nombre del Sprint"
        required
      />
      <input
        type="date"
        name="fechaInicio"
        value={sprint.fechaInicio}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="fechaFin"
        value={sprint.fechaFin}
        onChange={handleChange}
        required
      />

      {/* Selector de color */}
      <input
        type="color"
        name="color"
        value={sprint.color}
        onChange={handleChange}
      />

      <h4>Agregar Tareas:</h4>
      <select onChange={(e) => handleAgregarTarea(e.target.value)}>
        <option value="">-- Seleccionar tarea --</option>
        {tareasDisponibles.map((tarea) => (
          <option key={tarea._id} value={tarea._id}>
            {tarea.titulo}
          </option>
        ))}
      </select>

      {/* Lista de tareas agregadas */}
      <h4>Tareas en el Sprint:</h4>
      <ul>
        {sprint.listaTareas.length > 0 ? (
          sprint.listaTareas.map((idTarea) => {
            const tarea = tareasDisponibles.find((t) => t._id === idTarea);
            return (
              <li key={idTarea}>
                {tarea ? tarea.titulo : "Tarea desconocida"}
                <button
                  type="button"
                  onClick={() => handleQuitarTarea(idTarea)}
                >
                  Quitar
                </button>
              </li>
            );
          })
        ) : (
          <li>No hay tareas agregadas.</li>
        )}
      </ul>

      <button type="submit">Guardar Sprint</button>
    </form>
  );
}

export default SprintFormulario;
