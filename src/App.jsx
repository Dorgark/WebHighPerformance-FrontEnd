import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./services/auth.js";

import Login from "./pages/admin/Login.jsx";
import Cadastro from "./pages/admin/Cadastro.jsx";
import Home from "./pages/Home.jsx";

import { CartProvider } from "./context/CartContext.jsx";
import CartDrawer from "./pages/client/CartDrawer.jsx";

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<CartDrawer />} />
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
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;