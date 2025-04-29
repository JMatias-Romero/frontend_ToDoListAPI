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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="titulo"
        value={tarea.titulo}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <textarea
        name="descripcion"
        value={tarea.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      />
      <select
        name="estado"
        value={tarea.estado}
        onChange={handleChange}
        required
      >
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
      <input
        type="date"
        name="fechaLimite"
        value={tarea.fechaLimite?.split("T")[0]}
        onChange={handleChange}
        required
      />
      <input
        type="color"
        name="color"
        value={tarea.color}
        onChange={handleChange}
      />
      <button type="submit">
        {tareaInicial ? "Actualizar Tarea" : "Crear Tarea"}
      </button>
    </form>
  );
}

export default TareaFormulario;
