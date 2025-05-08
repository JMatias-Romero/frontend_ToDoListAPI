import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TareasPage from "./pages/TareasPage";
import CrearTareaPage from "./pages/CrearTareaPage";
import EditarTareaPage from "./pages/EditarTareaPage";

import BacklogPage from "./pages/BacklogPage";
import CrearBacklogPage from "./pages/CrearBacklogPage";
import EditarBacklogPage from "./pages/EditarBacklogPage";

import SprintsPage from "./pages/SprintsPage";
import CrearSprintPage from "./pages/CrearSprintPage";
import EditarSprintPage from "./pages/EditarSprintPage";

import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="bg-dark text-white min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<TareasPage />} />
          <Route path="/tareas" element={<TareasPage />} />
          <Route path="/crear-tarea" element={<CrearTareaPage />} />
          <Route path="/editar-tarea/:id" element={<EditarTareaPage />} />

          <Route path="/sprints" element={<SprintsPage />} />
          <Route path="/crear-sprint" element={<CrearSprintPage />} />
          <Route path="/editar-sprint/:id" element={<EditarSprintPage />} />

          <Route path="/backlogs" element={<BacklogPage />} />
          <Route path="/backlogs/crear" element={<CrearBacklogPage />} />
          <Route path="/backlogs/:id/editar" element={<EditarBacklogPage />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />;
      </div>
    </Router>
  );
}

export default App;
