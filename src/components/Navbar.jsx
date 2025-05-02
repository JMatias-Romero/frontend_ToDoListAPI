import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3 mb-4"
      style={{
        backgroundColor: "#2d333b",
        color: "#f8f9fa",
        padding: "1rem 2rem",
      }}
    >
      <div className="container-fluid">
        <span
          className="navbar-brand fs-4"
          style={{ color: "#f8f9fa", fontWeight: "bold", fontSize: "1.25rem" }}
        >
          ToDo List
        </span>

        <Link className="custom-nav-link" to="/">
          Tareas
        </Link>
        <Link className="custom-nav-link" to="/sprints">
          Sprints
        </Link>
        <Link className="custom-nav-link" to="/backlogs">
          Backlogs
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
