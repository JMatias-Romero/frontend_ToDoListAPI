import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SprintFormulario from "../componentes/SprintFormulario"; // Importamos el formulario
import { obtenerSprint, editarSprint } from "../api/sprintsApi"; // APIs para obtener y editar el sprint

function EditarSprintPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID del sprint desde la URL
  const [sprint, setSprint] = useState(null); // Estado para el sprint a editar

  // Cargar los datos del sprint cuando se monta el componente
  useEffect(() => {
    async function cargarSprint() {
      try {
        const datosSprint = await obtenerSprint(id); // Llamada a la API para obtener los datos del sprint
        setSprint(datosSprint); // Asignamos el sprint al estado
      } catch (error) {
        console.error("Error al cargar el sprint:", error);
      }
    }

    cargarSprint();
  }, [id]);

  // Función que maneja la edición de un sprint
  const handleEditarSprint = async (sprintEditado) => {
    try {
      await editarSprint(id, sprintEditado); // Llamada a la API para editar el sprint
      navigate("/sprints"); // Redirige a la lista de sprints después de editar
    } catch (error) {
      console.error("Error al editar el sprint:", error);
    }
  };

  if (!sprint) return <p>Cargando datos del sprint...</p>;

  return (
    <div>
      <h2>Editar Sprint</h2>
      <SprintFormulario sprintInicial={sprint} onSubmit={handleEditarSprint} />
    </div>
  );
}

export default EditarSprintPage;
