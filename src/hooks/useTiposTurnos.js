import { useEffect, useState } from "react";
import { getTipos } from "../api/tiposTurno.api";

export const useTiposTurnos = () => {

  const [tiposTurnos, setTiposTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTiposTurnos = async () => {
    try {
      const data = await getTipos();
      setTiposTurnos(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTiposTurnos();
  }, []);

  return {
    tiposTurnos,
    loadingTiposTurnos : loading,
    error,
    fetchTiposTurnos : loadTiposTurnos
  };
};