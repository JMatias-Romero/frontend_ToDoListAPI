import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  obtenerSprintPorId,
  actualizarSprint,
  eliminarSprint,
} from "../api/sprintsApi";
import SprintFormulario from "../components/SprintFormulario";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

function EditarSprint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sprint, setSprint] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarSprint() {
      try {
        const datos = await obtenerSprintPorId(id);
        const sprintFormateado = {
          ...datos,
          fechaInicio: new Date(datos.fechaInicio).toISOString().slice(0, 10),
          fechaFin: new Date(datos.fechaFin).toISOString().slice(0, 10),
        };
        setSprint(sprintFormateado);
      } catch (error) {
        console.error("Error al cargar sprint:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarSprint();
  }, [id]);

  const handleActualizar = async (datosActualizados) => {
    try {
      await actualizarSprint(id, datosActualizados);
      toast.success("Sprint actualizado correctamente");
      navigate("/sprints");
    } catch (error) {
      console.error("Error al actualizar sprint:", error);
      Swal.fire("Error", "No se pudo actualizar el sprint.", "error");
    }
  };

  const handleEliminar = async () => {
    if (!confirm("¿Estás seguro que querés eliminar este sprint?")) return;
    try {
      await eliminarSprint(id);
      navigate("/sprints");
    } catch (error) {
      console.error("Error al eliminar sprint:", error);
    }
  };

  if (cargando) return <p className="container mt-4">Cargando sprint...</p>;
  if (!sprint)
    return <p className="container mt-4">No se encontró el sprint</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Sprint</h2>
      <SprintFormulario onSubmit={handleActualizar} initialData={sprint} />
      <button onClick={handleEliminar} className="btn btn-danger mt-3">
        Eliminar Sprint
      </button>
    </div>
  );
}

export default EditarSprint;
