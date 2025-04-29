import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TareasPage from "./pages/TareasPage";
import SprintsPage from "./pages/SprintsPage";
import BacklogPage from "./pages/BacklogPage";

import CrearTareaPage from "./pages/CrearTareaPage";
import EditarTareaPage from "./pages/EditarTareaPage";

import CrearSprintPage from "./pages/CrearSprintPage";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<TareasPage />} />
          <Route path="/sprints" element={<SprintsPage />} />
          <Route path="/backlogs" element={<BacklogPage />} />
          <Route path="/crear-tarea" element={<CrearTareaPage />} />
          <Route path="/editar-tarea/:id" element={<EditarTareaPage />} />
          <Route path="/crear-sprint" element={<CrearSprintPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
