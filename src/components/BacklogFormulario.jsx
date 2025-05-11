import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function BacklogFormulario({
  backlogInicial,
  onSubmit,
  tareasDisponibles = [],
}) {
  const [backlog, setBacklog] = useState({
    nombre: "",
    listaTareas: [],
  });

  useEffect(() => {
    if (backlogInicial) {
      setBacklog({
        ...backlogInicial,
        listaTareas: backlogInicial.listaTareas.map((tarea) =>
          typeof tarea === "object" && tarea !== null ? tarea._id : tarea
        ),
      });
    }
  }, [backlogInicial]);

  const handleChange = (e) => {
    setBacklog({ ...backlog, [e.target.name]: e.target.value });
  };

  const toggleTarea = (idTarea) => {
    const id = String(idTarea);
    setBacklog((prev) => {
      const yaAgregada = prev.listaTareas.includes(id);
      toast.info(
        yaAgregada ? "Tarea quitada del backlog" : "Tarea agregada al backlog",
        { toastId: `toggle-${id}` }
      );
      return {
        ...prev,
        listaTareas: yaAgregada
          ? prev.listaTareas.filter((tid) => tid !== id)
          : [...prev.listaTareas, id],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (backlog.nombre.trim() === "") {
      toast.warn("El nombre del backlog no puede estar vacío.");
      return;
    }

    try {
      await onSubmit(backlog);
      Swal.fire({
        icon: "success",
        title: backlogInicial ? "Backlog actualizado" : "Backlog creado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      toast.error("Error al guardar el backlog");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card shadow p-4 mt-4 mx-auto bg-light"
      style={{ maxWidth: "600px", borderRadius: "1rem" }}
    >
      <h3 className="mb-4 text-primary text-center fw-bold">
        {backlogInicial ? "Editar Backlog" : "Crear Backlog"}
      </h3>

      <div className="mb-3">
        <label className="form-label fw-semibold">Nombre:</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={backlog.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Tareas disponibles:</label>
        {tareasDisponibles.length === 0 ? (
          <div className="alert alert-warning p-2">
            No hay tareas sin asignar a un sprint.
          </div>
        ) : (
          <ul className="list-group">
            {tareasDisponibles.map((tarea) => {
              const enBacklog = backlog.listaTareas.includes(String(tarea._id));
              return (
                <li
                  key={tarea._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{tarea.titulo}</span>
                  <button
                    type="button"
                    className={`btn btn-sm ${
                      enBacklog ? "btn-danger" : "btn-success"
                    }`}
                    onClick={() => toggleTarea(tarea._id)}
                  >
                    {enBacklog ? "Quitar" : "Agregar"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button type="submit" className="btn btn-primary px-4">
          {backlogInicial ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}

export default BacklogFormulario;
