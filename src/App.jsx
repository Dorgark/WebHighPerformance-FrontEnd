import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { isAuthenticated } from "./services/auth.js"
import Header from "./components/Header.jsx"
import BarraBusca from "./components/BarraBusca.jsx"
import Login from "./pages/admin/Login.jsx"
import Cadastro from "./pages/admin/Cadastro.jsx"

// ─── Rota protegida ────────────────────────────────────────────────────────────
// Só acessa se tiver token JWT salvo no localStorage.
// Caso contrário, redireciona para o login.
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />
  }
  return children
}

// ─── Rota pública ─────────────────────────────────────────────────────────────
// Só acessa se NÃO estiver logado.
// Se já tiver token, redireciona direto para /home (evita ver login novamente).
function PublicRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/home" replace />
  }
  return children
}

// ─── Página Home (placeholder) ────────────────────────────────────────────────
function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Header />
      <BarraBusca />
      <main className="px-5">
        <p className="text-gray-400 text-center mt-10">A grid de produtos vem aqui...</p>
      </main>
    </div>
  )
}

// ─── Aplicação ────────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas — redireciona para /home se já logado */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
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

        {/* Rota protegida — redireciona para / se não logado */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Qualquer rota desconhecida → login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App