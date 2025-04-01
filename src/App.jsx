import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Mapa de Puestos</Link></li>
          <li><Link to="/editor">Editor de Mapa</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;