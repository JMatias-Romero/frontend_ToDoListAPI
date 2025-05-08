import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//imports de apis
import { crearBacklog } from "../api/backlogApi";
import { obtenerTareasNoAsignadas } from "../api/tareasApi";

//import de formulario
import BacklogFormulario from "../components/BacklogFormulario";

//librerias de mensajes
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function CrearBacklogPage() {
  const [tareasDisponibles, setTareasDisponibles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareas = await obtenerTareasNoAsignadas();
        setTareasDisponibles(tareas);
        console.log("taras disponibes: ", tareas);
      } catch (error) {
        console.error("Error al cargar tareas disponibles:", error);
        Swal.fire("Error", "No se pudieron cargar las tareas.", "error");
      }
    };
    cargarTareas();
  }, []);

  const handleCrear = async (nuevoBacklog) => {
    try {
      await crearBacklog(nuevoBacklog);
      toast.success("Backlog creado correctamente");
      navigate("/backlogs");
    } catch (error) {
      console.error("Error al crear backlog:", error);
      Swal.fire("Error", "No se pudo crear el backlog.", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Crear Nuevo Backlog</h2>
      <BacklogFormulario
        onSubmit={handleCrear}
        tareasDisponibles={tareasDisponibles}
      />
    </div>
  );
}

export default CrearBacklogPage;
