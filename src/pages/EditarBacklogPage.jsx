import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//imports de apis
import { obtenerBacklogPorId, actualizarBacklog } from "../api/backlogApi";
import { obtenerTareasNoAsignadas } from "../api/tareasApi";

import BacklogFormulario from "../components/BacklogFormulario";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

function EditarBacklogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [backlog, setBacklog] = useState(null);
  const [tareasDisponibles, setTareasDisponibles] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datosBacklog = await obtenerBacklogPorId(id);
        setBacklog(datosBacklog);

        const tareasNoAsignadas = await obtenerTareasNoAsignadas();

        // Incluir tareas que ya están en este backlog aunque estén asignadas
        const tareasActuales = datosBacklog.listaTareas || [];
        const tareasCompletas = [...tareasNoAsignadas, ...tareasActuales];

        const unicas = tareasCompletas.filter(
          (tarea, index, self) =>
            index === self.findIndex((t) => t._id === tarea._id)
        );

        setTareasDisponibles(unicas);
        console.log("Backlog original:", datosBacklog);
        console.log("Tareas no asignadas a sprints:", tareasNoAsignadas);
        console.log("Tareas actuales del backlog:", tareasActuales);
        console.log("Tareas unificadas:", unicas);
      } catch (error) {
        console.error("Error al cargar backlog:", error);
        Swal.fire("Error", "No se pudo cargar el backlog.", "error");
      }
    };

    cargarDatos();
  }, [id]);

  const handleActualizar = async (datosActualizados) => {
    try {
      await actualizarBacklog(id, datosActualizados);
      toast.success("Backlog actualizado correctamente");
      navigate("/backlogs");
    } catch (error) {
      console.error("Error al actualizar backlog:", error);
      Swal.fire("Error", "No se pudo actualizar el backlog.", "error");
    }
  };

  if (!backlog) return <p className="text-center mt-4">Cargando backlog...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Editar Backlog</h2>
      <BacklogFormulario
        backlogInicial={backlog}
        onSubmit={handleActualizar}
        tareasDisponibles={tareasDisponibles}
      />
    </div>
  );
}

export default EditarBacklogPage;
