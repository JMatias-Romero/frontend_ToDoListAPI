import TareaFormulario from "../components/TareaFormulario";
import { crearTarea } from "../api/tareasApi";
import { useNavigate } from "react-router-dom";

function CrearTareaPage() {
  const navigate = useNavigate();

  const handleSubmit = async (tarea) => {
    try {
      await crearTarea(tarea);
      navigate("/"); // Luego de crear, volvemos a la lista de tareas
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  return (
    <div>
      <h2>Crear Nueva Tarea</h2>
      <TareaFormulario onSubmit={handleSubmit} />
    </div>
  );
}

export default CrearTareaPage;
