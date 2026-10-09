import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { QuemSomosPage } from '../pages/QuemSomosPage';
import { EquipaPage } from '../pages/EquipaPage';
import { ResponsabilidadesPage } from '../pages/ResponsabilidadesPage';
import { CalculadoraPage } from '../pages/CalculadoraPage';
import { InternalLoginPage } from '../pages/InternalLoginPage';
import { CalculadoraInternaPage } from '../pages/CalculadoraInternaPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { InternalAuthProvider } from '../context/InternalAuthContext';

/**
 * Top-level application routing architecture.
 *
 * Separates public institutional pages (with didactical preview simulator)
 * from the restricted UrbanFlow internal workspace (complete 36-question engine & spreadsheet ingest).
 */
export const AppRoutes: React.FC = () => {
  return (
    <InternalAuthProvider>
      <Routes>
        {/* PUBLIC ENVIRONMENT */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="quem-somos" element={<QuemSomosPage />} />
          <Route path="a-equipa" element={<EquipaPage />} />
          <Route path="responsabilidades" element={<ResponsabilidadesPage />} />
          <Route path="calculadora" element={<CalculadoraPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* PRIVATE INTERNAL WORKSPACE (UrbanFlow Team) */}
        <Route path="/interno/login" element={<InternalLoginPage />} />
        <Route
          path="/interno/calculadora"
          element={
            <ProtectedRoute>
              <CalculadoraInternaPage />
            </ProtectedRoute>
          }
        />
        <Route path="/interno" element={<Navigate to="/interno/calculadora" replace />} />
      </Routes>
    </InternalAuthProvider>
  );
};
