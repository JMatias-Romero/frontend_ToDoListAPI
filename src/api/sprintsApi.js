const API = "http://localhost:3000/sprints";

// Obtener todos los sprints
export const obtenerSprints = async () => {
  const res = await fetch(API);
  return res.ok ? await res.json() : [];
};

// Crear un nuevo sprint
export const crearSprint = async (sprint) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sprint),
  });
  if (!res.ok) {
    throw new Error("Error al crear el sprint");
  }
  return await res.json();
};

// Obtener sprint por ID
export const obtenerSprintPorId = async (id) => {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener el sprint");
  }
  return await res.json();
};

// Actualizar sprint
export const actualizarSprint = async (id, sprint) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sprint),
  });
  if (!res.ok) {
    throw new Error("Error al actualizar el sprint");
  }
  return await res.json();
};

// Eliminar sprint
export const eliminarSprint = async (id) => {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error al eliminar el sprint");
  }
};

// api/sprintsApi.js

export const eliminarTareaDelSprint = async (sprintId, tareaId) => {
  const response = await fetch(`/api/sprints/${sprintId}/tareas/${tareaId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar la tarea.");
  }
};
