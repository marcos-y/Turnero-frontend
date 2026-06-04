import { useEffect, useState } from "react";
import { getTurnosByDia } from "../api/turnos.api";

export const useTurnosDia = () => {

  const [turnosDia, setTurnosDia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTurnosByDia = async () => {
    try {
      const data = await getTurnosByDia();
      setTurnosDia(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTurnosByDia();
  }, []);

  return {
    turnosDia,
    loadingTurnos: loading,
    error,
    fetchTurnosDia: loadTurnosByDia,
  };
};