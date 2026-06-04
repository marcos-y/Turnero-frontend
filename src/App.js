import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import GenerarTurno from "./pages/GenerarTurno";
import VerTurnos from "./pages/VerTurnos";
import Cajero from "./pages/Cajero";
import Home from './pages/Home'
import Login from "./pages/Login";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminRoute from "./pages/Admin/AdminRoute";

const App = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/generar" element={<GenerarTurno />} />
          <Route path="/ver" element={<VerTurnos />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cajero" element={<Cajero />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;