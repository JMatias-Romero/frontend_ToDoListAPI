import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerTareaPorId, actualizarTarea } from "../api/tareasApi";
import TareaFormulario from "../components/TareaFormulario";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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
        toast.error("No se encontró la tarea solicitada");
        navigate("/tareas");
      }
    }
    cargarTarea();
  }, [id, navigate]);

  const handleActualizarTarea = async (datosActualizados) => {
    try {
      await actualizarTarea(id, datosActualizados);
      Swal.fire({
        icon: "success",
        title: "Tarea actualizada",
        text: "La tarea fue actualizada correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/tareas");
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      toast.error("Error al actualizar la tarea");
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
