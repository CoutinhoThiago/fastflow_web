import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import FilaPage from './pages/FilaPage';
import MedicoPage from './pages/MedicoPage';
import AtendentePage from './pages/AtendentePage';
import { NotFoundPage } from './pages/NotFoundPage';
import ExamesPage from './pages/ExamesPage';
import CheckInPage from './pages/CheckInPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/medico" element={<MedicoPage />} />
        <Route path="/atendente" element={<AtendentePage />} />
        <Route path="/fila" element={<FilaPage />} />
        <Route path="/exames" element={<ExamesPage />} />
        <Route path="/checkin" element={<CheckInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
