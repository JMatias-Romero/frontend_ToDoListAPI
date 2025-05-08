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
        listaTareas: backlogInicial.listaTareas || [],
      });
    }
  }, [backlogInicial]);

  const handleChange = (e) => {
    setBacklog({ ...backlog, [e.target.name]: e.target.value });
  };

  const toggleTarea = (idTarea) => {
    setBacklog((prev) => {
      const yaAgregada = prev.listaTareas.includes(idTarea);
      toast.info(
        yaAgregada ? "Tarea quitada del backlog" : "Tarea agregada al backlog",
        { toastId: "tareaToggle" }
      );
      return {
        ...prev,
        listaTareas: yaAgregada
          ? prev.listaTareas.filter((id) => id !== idTarea)
          : [...prev.listaTareas, idTarea],
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
    } catch (error) {
      toast.error("Error al guardar el backlog");
    }
  };

  // 🔍 Filtrar tareas que no estén asignadas a ningún sprint
  const tareasFiltradas = tareasDisponibles;

  return (
    <form
      onSubmit={handleSubmit}
      className="card shadow-sm p-4 mt-3 mx-auto"
      style={{ maxWidth: "600px", borderRadius: "12px" }}
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
        {tareasFiltradas.length === 0 ? (
          <div className="alert alert-warning p-2">
            No hay tareas sin asignar a un sprint.
          </div>
        ) : (
          <ul className="list-group">
            {tareasFiltradas.map((tarea) => (
              <li
                key={tarea._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{tarea.titulo}</span>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    backlog.listaTareas.includes(tarea._id)
                      ? "btn-outline-danger"
                      : "btn-outline-success"
                  }`}
                  onClick={() => toggleTarea(tarea._id)}
                >
                  {backlog.listaTareas.includes(tarea._id)
                    ? "Quitar"
                    : "Agregar"}
                </button>
              </li>
            ))}
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
