import TareaFormulario from "../components/TareaFormulario";
import { crearTarea } from "../api/tareasApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CrearTareaPage() {
  const navigate = useNavigate();

  const handleCrearTarea = async (nuevaTarea) => {
    try {
      await crearTarea(nuevaTarea);
      toast.success("Tarea creada con éxito");
      navigate("/tareas");
    } catch (error) {
      console.error("Error al crear tarea:", error);
      toast.error("Ocurrió un error al guardar la tarea");
    }
  };

  return <TareaFormulario onSubmit={handleCrearTarea} />;
}

export default CrearTareaPage;
