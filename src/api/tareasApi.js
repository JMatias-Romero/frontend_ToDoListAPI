const API = "http://localhost:3000/tareas";

//obtener todas las tareas
export const obtenerTareas = async () => {
  const res = await fetch(API);
  return res.ok ? await res.json() : [];
};

//crear tarea
export const crearTarea = async (tarea) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  if (!res.ok) {
    throw new Error("Error al crear tarea");
  }
  return await res.json();
};

//Obtener tarea por id
export const obtenerTareaPorId = async (id) => {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener tarea");
  }
  return await res.json();
};

//actualizar tarea
export const actualizarTarea = async (id, tareaActualizada) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tareaActualizada),
  });
  if (!res.ok) {
    throw new Error("Error al actualizar tarea");
  }
  return await res.json();
};

// Eliminar tarea
export const eliminarTarea = async (id) => {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al eliminar tarea");
  }
  return data;
};

//obtener tareas no asignadas a un sprint ni backlog
export const obtenerTareasNoAsignadas = async () => {
  const response = await fetch(`${API}/no-asignadas`);
  if (!response.ok) throw new Error("Error al obtener tareas no asignadas");
  return await response.json();
};
