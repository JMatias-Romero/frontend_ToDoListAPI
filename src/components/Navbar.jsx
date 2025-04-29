import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#eee", marginBottom: "1rem" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Tareas
      </Link>
      <Link to="/sprints" style={{ marginRight: "1rem" }}>
        Sprints
      </Link>
      <Link to="/backlogs" style={{ marginRight: "1rem" }}>
        Backlogs
      </Link>
      <Link to="/crear-tarea">Crear Tarea</Link>
    </nav>
  );
}

export default Navbar;
