const API = "http://localhost:3000/backlogs";

export const obtenerBacklogs = async () => {
  const respuesta = await fetch(API);
  if (!respuesta.ok) throw new Error("Error al obtener backlogs");
  return await respuesta.json();
};
