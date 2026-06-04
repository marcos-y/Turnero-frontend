import { useEffect, useState } from "react";
import { getTipos } from "../api/tiposUsuarios.api";

export const useTiposUsuarios = () => {

  const [tiposUsuarios, setTiposUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTiposUsuarios = async () => {
    try {
      const data = await getTipos();
      setTiposUsuarios(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTiposUsuarios();
  }, []);

  return {
    tiposUsuarios,
    loadingTiposUsuarios : loading,
    error,
    fetchTiposUsuarios : loadTiposUsuarios
  };
};