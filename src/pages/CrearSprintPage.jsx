import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import de apis
import { crearSprint } from "../api/sprintsApi";

//import de formulario
import SprintFormulario from "../components/SprintFormulario";

//librerias de mensajes
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function CrearSprintPage() {
  const navigate = useNavigate();

  const handleCrearSprint = async (sprint) => {
    try {
      await crearSprint(sprint);
      toast.success("Sprint creado correctamente");
      navigate("/sprints");
    } catch (error) {
      console.error("Error al crear el sprint:", error);
      Swal.fire("Error", "No se pudo crear el sprint.", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crear Nuevo Sprint</h2>
      <SprintFormulario onSubmit={handleCrearSprint} />
    </div>
  );
}

export default CrearSprintPage;
