import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { QuemSomosPage } from '../pages/QuemSomosPage';
import { EquipaPage } from '../pages/EquipaPage';
import { ResponsabilidadesPage } from '../pages/ResponsabilidadesPage';
import { CalculadoraPage } from '../pages/CalculadoraPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="quem-somos" element={<QuemSomosPage />} />
        <Route path="a-equipa" element={<EquipaPage />} />
        <Route path="responsabilidades" element={<ResponsabilidadesPage />} />
        <Route path="calculadora" element={<CalculadoraPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
