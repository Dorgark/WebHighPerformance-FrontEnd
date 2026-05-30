import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./services/auth.js";

// Componentes
import Header from "./components/Header.jsx";
import BarraBusca from "./components/BarraBusca.jsx";
import Card from "./components/ProductCard.jsx";
import Filtros from "./components/Filter.jsx";

// Páginas
import Login from "./pages/admin/Login.jsx";
import Cadastro from "./pages/admin/Cadastro.jsx";
import Home from "./pages/Home.jsx";

// ─── Rota protegida ────────────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

// ─── Rota pública ─────────────────────────────────────────────────────────────
function PublicRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// ─── nossas rotas ───────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* rota principal é a home. */}

        {/* Rotas do Admin */}
        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/cadastro"
          element={
            <PublicRoute>
              <Cadastro />
            </PublicRoute>
          }
        />

        {/* Redirecionamentos de Segurança */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;