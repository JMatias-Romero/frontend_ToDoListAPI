import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SprintFormulario from "../components/SprintFormulario"; // Importamos el formulario
import { crearSprint } from "../api/sprintsApi"; // Importamos la API para crear un sprint

function CrearSprintPage() {
  const navigate = useNavigate();

  // Función que maneja la creación de un sprint
  const handleCrearSprint = async (sprint) => {
    try {
      await crearSprint(sprint); // Llamada a la API para crear el sprint
      navigate("/sprints"); // Redirige a la lista de sprints después de crear
    } catch (error) {
      console.error("Error al crear el sprint:", error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Sprint</h2>
      <SprintFormulario onSubmit={handleCrearSprint} />
    </div>
  );
}

export default CrearSprintPage;
