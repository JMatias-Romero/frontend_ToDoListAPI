import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerTareaPorId, actualizarTarea } from "../api/tareasApi";
import TareaFormulario from "../components/TareaFormulario";

function EditarTareaPage() {
  const [tarea, setTarea] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarTarea() {
      try {
        const datos = await obtenerTareaPorId(id);
        setTarea(datos);
      } catch (error) {
        console.error("Error al cargar tarea:", error);
      }
    }
    cargarTarea();
  }, [id]);

  const handleActualizarTarea = async (datosActualizados) => {
    try {
      await actualizarTarea(id, datosActualizados);
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  if (!tarea) return <p>Cargando tarea...</p>;

  return (
    <div>
      <h2>Editar Tarea</h2>
      <TareaFormulario tareaInicial={tarea} onSubmit={handleActualizarTarea} />
    </div>
  );
}

export default EditarTareaPage;
