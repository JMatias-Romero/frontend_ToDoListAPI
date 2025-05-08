import { useState, useEffect } from "react";

function TareaFormulario({ tareaInicial, onSubmit }) {
  const [tarea, setTarea] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    fechaLimite: "",
    color: "#000000",
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
      color: "#000000",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 mx-auto mt-4 tarea-formulario"
    >
      <div className="input-wrapper">
        <label htmlFor="titulo" className="label-form">
          Título:
        </label>
        <input
          type="text"
          name="titulo"
          className="form-control"
          value={tarea.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="descripcion" className="label-form">
          Descripción:
        </label>
        <textarea
          name="descripcion"
          className="form-control"
          value={tarea.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="estado" className="label-form">
          Estado:
        </label>
        <select
          name="estado"
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
      <div className="input-wrapper">
        <label htmlFor="fechaLimite" className="label-form">
          Fecha límite:
        </label>
        <input
          type="date"
          name="fechaLimite"
          className="form-control"
          value={tarea.fechaLimite?.split("T")[0] || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="color" className="label-form">
          Color:
        </label>
        <input
          type="color"
          name="color"
          className="form-control form-control-color"
          value={tarea.color}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          {tareaInicial ? "Actualizar Tarea" : "Crear Tarea"}
        </button>
      </div>
    </form>
  );
}

export default TareaFormulario;
