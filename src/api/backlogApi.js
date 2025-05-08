const API = "http://localhost:3000/backlogs";

// Get all backlogs
export const obtenerBacklogs = async () => {
  const respuesta = await fetch(API);
  if (!respuesta.ok) throw new Error("Error al obtener backlogs");
  return await respuesta.json();
};

// Get backlog by ID
export const obtenerBacklogPorId = async (id) => {
  const respuesta = await fetch(`${API}/${id}`);
  if (!respuesta.ok) throw new Error("Error al obtener el backlog");
  return await respuesta.json();
};

// Create backlog
export const crearBacklog = async (datos) => {
  const response = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!response.ok) throw new Error("Error al crear el backlog.");
  return await response.json();
};

// Update backlog
export const actualizarBacklog = async (id, datos) => {
  const respuesta = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!respuesta.ok) throw new Error("Error al actualizar el backlog");
  return await respuesta.json();
};
