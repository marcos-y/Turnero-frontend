import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const userType = localStorage.getItem("id_tipo_usuario");

  return userType === "1"
    ? children
    : <Navigate to="/login" replace />;
}