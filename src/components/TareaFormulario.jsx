import { useState, useEffect } from "react";

function TareaFormulario({ tareaInicial, onSubmit }) {
  const [tarea, setTarea] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    fechaLimite: "",
    color: "",
  });

  useEffect(() => {
    if (tareaInicial) {
      setTarea({
        ...tareaInicial,
        fechaLimite: tareaInicial.fechaLimite?.split("T")[0], // solo la fecha
      });
    }
  }, [tareaInicial]);

  const handleChange = (e) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tarea);
    setTarea({
      titulo: "",
      descripcion: "",
      estado: "pendiente",
      fechaLimite: "",
      color: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">
          Título:{" "}
        </label>
        <input
          type="text"
          id="titulo"
          className="form-control"
          value={tarea.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">
          Descripción:{" "}
        </label>
        <textarea
          id="descripcion"
          value={tarea.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="estado" className="form-label">
          Estado:{" "}
        </label>
        <select
          id="estado"
          className="form-select"
          value={tarea.estado}
          onChange={handleChange}
          required
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="color" className="form-label">
          Fecha límite:{" "}
        </label>
        <input
          type="date"
          id="fechaLimite"
          value={tarea.fechaLimite?.split("T")[0]}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="color" className="form-label">
          Color
        </label>
        <input
          type="color"
          id="color"
          value={tarea.color}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-success">
        {tareaInicial ? "Actualizar Tarea" : "Crear Tarea"}
      </button>
    </form>
  );
}

export default TareaFormulario;
