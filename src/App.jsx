import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TareasPage from "./pages/TareasPage";
import SprintsPage from "./pages/SprintsPage";
import BacklogPage from "./pages/BacklogPage";

import CrearTareaPage from "./pages/CrearTareaPage";
import EditarTareaPage from "./pages/EditarTareaPage";

import CrearSprintPage from "./pages/CrearSprintPage";
import EditarSprintPage from "./pages/EditarSprintPage";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="bg-dark text-white min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<TareasPage />} />
          <Route path="/sprints" element={<SprintsPage />} />
          <Route path="/backlogs" element={<BacklogPage />} />
          <Route path="/crear-tarea" element={<CrearTareaPage />} />
          <Route path="/editar-tarea/:id" element={<EditarTareaPage />} />
          <Route path="/crear-sprint" element={<CrearSprintPage />} />
          <Route path="/editar-sprint/:id" element={<EditarSprintPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
