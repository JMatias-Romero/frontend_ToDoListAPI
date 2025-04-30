import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  obtenerSprints,
  obtenerSprintPorId,
  actualizarSprint,
  eliminarSprint,
} from "../api/sprintsApi";
import SprintFormulario from "../components/SprintFormulario";

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
      navigate("/sprints");
    } catch (error) {
      console.error("Error al actualizar sprint:", error);
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

  if (cargando) return <p>Cargando sprint...</p>;
  if (!sprint) return <p>No se encontró el sprint</p>;

  return (
    <div>
      <h2>Editar Sprint</h2>
      <SprintFormulario onSubmit={handleActualizar} initialData={sprint} />
      <button
        onClick={handleEliminar}
        style={{ marginTop: "1rem", color: "red" }}
      >
        Eliminar Sprint
      </button>
    </div>
  );
}

export default EditarSprint;
